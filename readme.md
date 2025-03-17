# My Business Card Project

## [Project Demo](https://67cc52def9698d0008bd1a5c--mybusinesscard-rkdeofuf.netlify.app/)

## 프로젝트 개요 (Project Overview)

- **프로젝트 이름** : My Business Card

- **프로젝트 소개** : Firebase Realtime Database를 활용하여 실시간 데이터 저장 기반의 개인 비즈니스 카드 생성 프로젝트.

## 프로젝트 동기 (Motivation)

- 약 3-4년 전, 기존 강의를 통해 완성했던 프로젝트에 새롭게 학습한 기술들을 적용함으로써, 네이밍 컨벤션, 디자인 패턴, 컴포넌트 구조에 대해 보다 폭넓게 고민하고, 이 과정에서 React Hooks, Redux 등 다양한 스택에 대한 이해도를 한층 높이고자 함.

## 프로젝트 문제 및 목표 (Problems & Goal)

### 문제 (Problems)

**코드 구조**

- 불안정한 컴포넌트 구조와 무분별한 props drilling으로 인해 유지보수성, 가독성, 오류추적성이 좋지 않음.

**관심사 분리의 부재**

- 한 파일안에 여러 기능을 수행하는 코드가 포함되어 있어 관심사 분리가 적절히 이루어지지 않음.

### 목표 (Goals)

**코드 구조 및 디자인(UI) 개선**

- 컴포넌트 구조를 재설계함으로써 재사용성과 가독성 개선.

- Redux Tooklit, Context API와 디자인 패턴을 활용하여 Props drilling 문제 완화.

**기능 추가**

- 수학적 계산을 통한 이미지 표현 범위, 위치 조정 기능 추가.

## 기술 스텍 (Technique Stacks)

**Front-end**

- React(Vite)

- Tailwind CSS

- Redux, Redux Toolkit

**Database**

- Firebase Realtime Database

**Cloud Services**

- Cloudinary API (이미지 저장)

## 코드 개선 및 리펙토링 (Code Improvement & Refactoring)

### 브라우저 리사이즈 처리 최적화 (useResponse -> responseContext)

**문제점 및 개선 배경**

- 브라우저 전역 스크롤(resize)에 따라 요소의 크기를 동적으로 조절하기 위해 공통적으로 사용되는 useResponse 훅을 정의함.

- 여러 컴포넌트에서 해당 훅을 각각 사용할 경우, 각 컴포넌트별로 불필요한 이벤트 리스너가 중복 등록되어 성능 저하가 발생할 우려가 생김.

![useResponse](./document/useResponse.drawio.svg)

**개선 목표**

- 중복 이벤트 리스너에 의한 성능 저하를 최소화하고, 반응형 정보 상태를 한 곳에서 집중적으로 관리할 수 있는 구조로 개선.

**기존 코드**

- `useResponsive` 커스텀 훅은 resize 이벤트를 통해 브라우저 너비에 따라 사진의 크기와 크기를 조절하는 막대(bar)의 크기를 반환함.

```js
import { useEffect, useState } from 'react';
import {
	PICTURE_BOX_SIZE,
	PICTURE_BOX_SIZE_MEDIUM,
	RATE_BAR_WIDTH,
	RATE_BAR_WIDTH_MEDIUM,
} from '../constants';
import { throttle } from 'lodash';

export default function useResponsive() {
	const [pictureSize, setPictureSize] = useState(
		innerWidth <= 900 ? PICTURE_BOX_SIZE_MEDIUM : PICTURE_BOX_SIZE
	);

	const [barWidth, setBarWidth] = useState(
		innerWidth <= 900 ? RATE_BAR_WIDTH_MEDIUM : RATE_BAR_WIDTH
	);

	useEffect(() => {
		const onResizeWindow = throttle(() => {
			if (innerWidth <= 900) {
				setPictureSize(PICTURE_BOX_SIZE_MEDIUM);
				setBarWidth(RATE_BAR_WIDTH_MEDIUM);
			} else {
				setPictureSize(PICTURE_BOX_SIZE);
				setBarWidth(RATE_BAR_WIDTH);
			}
		}, 150);

		window.addEventListener('resize', onResizeWindow);
		return () => {
			window.removeEventListener('resize', onResizeWindow);
		};
	}, [setPictureSize, setBarWidth]);

	return {
		pictureSize,
		barWidth,
	};
}
```

**해결 방법**

- Context API로 상태를 관리함으로써 전역적으로 공통된 상태를 공유하도록 구조를 변경.

![useResponsive](./document/responsiveContext.drawio.svg)

**개선 후 코드**

- 기존 커스텀 훅 기반의 로직을 컨텍스트 API 기반으로 변경.

```js
import { useEffect, useState, createContext } from 'react';
import {
	PICTURE_BOX_SIZE,
	PICTURE_BOX_SIZE_MEDIUM,
	RATE_BAR_WIDTH,
	RATE_BAR_WIDTH_MEDIUM,
} from '../constants';

import { throttle } from 'lodash';

export const ResponsiveContext = createContext({
	barWidth: RATE_BAR_WIDTH,
	pictureSize: PICTURE_BOX_SIZE,
});

export const ResponsiveProvider = ({ children }) => {
	const [responsive, setResponsive] = useState({
		barWidth: RATE_BAR_WIDTH,
		pictureSize: PICTURE_BOX_SIZE,
	});

	useEffect(() => {
		const onResizeWindow = throttle(() => {
			if (innerWidth <= 900) {
				setResponsive({
					barWidth: RATE_BAR_WIDTH_MEDIUM,
					pictureSize: PICTURE_BOX_SIZE_MEDIUM,
				});
			} else {
				setResponsive({
					barWidth: RATE_BAR_WIDTH,
					pictureSize: PICTURE_BOX_SIZE,
				});
			}
		}, 150);

		window.addEventListener('resize', onResizeWindow);
		return () => {
			window.removeEventListener('resize', onResizeWindow);
		};
	}, []);

	return (
		<ResponsiveContext.Provider value={{ ...responsive }}>
			{children}
		</ResponsiveContext.Provider>
	);
};
```

**개선 코드의 합리성 및 타당성**

- 관심사 분리

  - 하나의 모듈(컨텍스트)가 여러 요소의 반응형 디자인 크기에 대한 책임을 가지고 있어 해당 모듈(컨텍스트)이 단일 책임 원칙(SRP)을 위반한다고 볼 수 있음.

  - 하지만 **반응형 크기 정보** 관점으로 보았을 때, 기존 각 컴포넌트에 적용된 로직이 유사하거나 같으므로, 이를 통합하는 것이 더욱 합리적으로 보임. 즉, **반응형 크기 결정** 이라는 단일 관심사로써 분리.

- 성능 개선

  - 각 요소마다 반응형 크기를 결정하기위해 중복된 이벤트 리스너를 등록하는 기존 방식은 중복된 이벤트 핸들러 호출을 유발해 성능 저하를 야기함.

  - 여러 컴포넌트에 적용될 수 있는 로직을 컨텍스트로 통합하여, 이벤트 리스너를 한 번만 등록하고 상태를 전역으로 공유함으로써 이벤트 호출 횟수를 줄임.

- 확장 가능성 및 유지보수성

  - 기능 추가시 해당 컴포넌트에 관한 훅 또는 이벤트 리스너를 추가적으로 작성하지 않아도 됨.

  - 기능 추가시 통합된 컨텍스트를 확장하여 필요한 로직만 추가하면 되므로, 추가적으로 모듈을 작성하지 않음으로써 프로젝트 복잡성 유지 및 수정 범위를 줄여 유지 보수에 유리함.

---

### 유저 드롭다운 UI 처리

**문제점 및 개선 배경**

- 특정 행동이 발생하면 기존에 활성화된 유저 드롭다운 UI를 비활성화 처리를 해야 하는 시나리오 발생.

- 유저 드롭다운 UI 비활성화 처리를 위한 메서드를 넘길 때 복잡한 Props drilling 구조가 발생.

![DropdownUIPropsDrilling](./document/userDropdownUIProps.drawio.svg)

**개선 목표**

- 복잡한 Props Drilling 구조 제거를 통해 컴포넌트간의 결합도를 낮추고, 재사용성 및 가독성 개선.

**해결 방법**

- 컨텍스트 API와 발행/구독 패턴(Pubsub Pattern)을 활용하여 컴포넌트간 이벤트를 구독하고 발행함으로써 상호작용할 수 있는 전역 컨텍스트 구현.

![PubsubContext](./document/pubsubContext.drawio.svg)

**개선 후 코드**

- PubsubContext를 통해 각 컴포넌트는 이벤트를 구독하고 발행함으로써 직접적인 의존 없이 상호작용할 수 있음.

- [Pubsub 디자인 패턴](https://github.com/kangdaelyeol/til/blob/main/book/js-react-design-pattern.md#%EB%B0%9C%ED%96%89%EA%B5%AC%EB%8F%85-%ED%8C%A8%ED%84%B4)은 도서 `<<JavaScript React Design Pattern>>` 을 참조.

```js
import { createContext, useCallback, useState } from 'react';

export const EVENT_TYPES = Object.freeze({
	HIDE_PROFILE_DETAIL: Symbol.for('HIDE_PROFILE_DETAIL'),
});

export const PubSubContext = createContext({
	subscribe: () => {},
	publish: () => {},
	unSubscribe: () => {},
});

export default function PubSubProvider({ children }) {
	const [subscribersMap, setSubscribersMap] = useState({});

	const subscribe = useCallback(
		(topic, handler) => {
			setSubscribersMap((prev) => {
				const newSubscribersMap = { ...prev };
				if (!newSubscribersMap[topic]) newSubscribersMap[topic] = [];

				newSubscribersMap[topic].push(handler);
				return newSubscribersMap;
			});
		},
		[subscribersMap]
	);

	const publish = useCallback(
		(topic, data) => {
			if (!subscribersMap[topic]) return;

			subscribersMap[topic].forEach((handler) => handler(data));
		},
		[subscribersMap]
	);

	const unSubscribe = useCallback(
		(topic, handler) => {
			if (!subscribersMap[topic]) return;

			setSubscribersMap((prev) => {
				const newSubscribersMap = { ...prev };
				newSubscribersMap[topic] = newSubscribersMap[topic].filter(
					(item) => item !== handler
				);
				return newSubscribersMap;
			});
		},
		[subscribersMap]
	);

	return (
		<PubSubContext.Provider value={{ subscribe, publish, unSubscribe }}>
			{children}
		</PubSubContext.Provider>
	);
}
```

**개선 코드의 합리성 및 타당성**

- 컴포넌트 의존성 분리

  - 부모와 자식 컴포넌트간 Props Drilling을 제거함으로써 의존성을 결합도를 낮추고 재사용성 향상.

- 확장 가능성 및 유지보수성

  - 기능 확장시 하위 컴포넌트에 추가적인 Props를 넘기지 않고 전역 Pubsub 채널을 통해 상호작용함으로써 컴포넌트간 의존성 증가 방지.

  - 기능 수정 및 삭제시 관련된 부모/자식 컴포넌트를 수정하지 않고 독립적인 이벤트 구독 발행 정보 및 액션만을 독립적으로 수정하면 됨. 따라서 유지보수성 및 추적성을 보장함.

- 가독성 및 직관성

  - Pubsub 채널의 이벤트 구독 정보가 변경되면 PubsubContext를 포함하는 컴포넌트는 모두 리렌더링 되므로 props drilling 방식과 비교하여 성능적으로 불리할 수 있으나, 이벤트 구독 정보의 변경은 빈번하게 발생하지 않으므로 코드의 가독성 및 직관성을 보장하는 것이 코드의 퀄리티 측면에서 더욱 유리하다고 판단.

- 협업 가능성

  - 범용적인 디자인 패턴을 사용함으로써 다른 개발자와 협업시 더욱 원활한 소통과 빠른 이해을 통해 원활하고 효율적인 협업 가능.

---
