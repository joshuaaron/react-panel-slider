import * as React from 'react';
import { pipe } from '../utils/helpers';
import { AnimationKeys, animations } from '../utils/animations';

type Props = {
	slideIndex: number;
	activeIndex: number;
	prevActiveIndex: number;
	isAnimating: boolean;
	animationType?: animationTypes;
	slideClassname?: string | string[];
	gridAreaValue?: string;
	handleAnimationEnd(): void;
} & typeof defaultProps;

const defaultProps = {
	animationType: {
		nextAnimation: AnimationKeys.FROM_RIGHT,
		prevAnimation: AnimationKeys.FROM_LEFT
	},
	gridAreaValue: 'slide'
	// onAnimationEnd: () => {}
};

export type animationTypes = {
	nextAnimation: AnimationKeys;
	prevAnimation: AnimationKeys;
};

export class Panel extends React.Component<Props, {}> {
	static readonly defaultProps = defaultProps;
	slide: HTMLDivElement;

	render() {
		const {
			activeIndex,
			slideIndex,
			slideClassname,
			gridAreaValue,
			children
		} = this.props;
		const isActive = activeIndex === slideIndex;

		const slideStyles: React.CSSProperties = {
			gridArea: gridAreaValue,
			overflow: 'hidden',
			visibility: 'hidden',
			transformStyle: 'preserve-3d',
			backfaceVisibility: 'hidden',
			willChange: 'transform',
			zIndex: isActive ? 1 : 0
		};

		// Assign prop, animation and direction classnames.
		const slideClassNames: string = pipe(
			this.assignPropClassnames,
			this.assignAnimationClassnames
		)(slideClassname).join(' ');

		return (
			<div
				style={slideStyles}
				className={slideClassNames.length ? slideClassNames : undefined}
				onAnimationEnd={this.handleAnimationEnd}
				ref={el => (this.slide = el as HTMLDivElement)}
			>
				{children}
			</div>
		);
	}

	// Assign any classnames passed as props.
	assignPropClassnames = (slideClassname: string | string[]) => {
		let classes: string[] = [];
		if (slideClassname) {
			// handle array of classes
			if (Array.isArray(slideClassname)) {
				classes = [...slideClassname];
			} else {
				classes.push(slideClassname);
			}
		}

		return classes;
	};

	// Assign relavant animation classes based on slide direction
	// and which animation is applied for both prev and next actions
	assignAnimationClassnames = (classes: string[]) => {
		const { activeIndex, prevActiveIndex, slideIndex } = this.props;

		const isExitingSlide = slideIndex === prevActiveIndex;
		const isEnteringSlide = slideIndex === activeIndex;
		const directionalClass = this.getDirectionalClassname(isEnteringSlide);

		let animationClasses: string[] = [];
		if (this.props.isAnimating) {
			if (isExitingSlide) {
				animationClasses = [...classes, 'isActive', ...directionalClass];
			} else if (isEnteringSlide) {
				animationClasses = [...classes, 'isActive', ...directionalClass];
			}
		} else if (isEnteringSlide) {
			animationClasses = [...classes, 'isActive'];
		} else {
			return classes;
		}

		return animationClasses;
	};

	getDirectionalClassname = (isEnteringSlide: boolean) => {
		const { activeIndex, prevActiveIndex } = this.props;
		const isAnimatingForward = activeIndex > prevActiveIndex ? true : false;

		const { enteringClass, exitingClass } = this.getAnimationType(
			isAnimatingForward
		);

		if (isEnteringSlide) {
			return enteringClass;
		} else {
			return exitingClass;
		}
	};

	// Retrieve the correct enter and exiting class names from animation object
	getAnimationType = (isAnimatingForward: boolean) => {
		const { nextAnimation, prevAnimation } = this.props.animationType;

		// Get Animation key based on if prev or next slide is called
		const animationKey = isAnimatingForward ? nextAnimation : prevAnimation;
		// Once we have the key -> get the containing object for that key and retrieve classnames
		const animationObj: any = animations.find((arr: any) => arr[animationKey]);
		const { enteringClass, exitingClass } = animationObj[animationKey] as any;

		return {
			enteringClass,
			exitingClass
		};
	};

	// Handle resetting of slides and any callback on animEnd
	handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
		const { handleAnimationEnd } = this.props;
		if (e && e.target !== this.slide) return;

		this.resetSlides();
		if (handleAnimationEnd) {
			handleAnimationEnd();
		}
	};

	// Need to find better way to handle reset?? (too implicit?)
	resetSlides = () => {
		const { prevActiveIndex, slideIndex } = this.props;
		const wasPreviousActive = prevActiveIndex === slideIndex;

		if (wasPreviousActive) {
			if (this.slide.classList.contains('isActive')) {
				this.slide.classList.remove('isActive');
			}
		}
	};
}
