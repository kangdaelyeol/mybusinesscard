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
