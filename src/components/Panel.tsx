import * as React from 'react';
import { pipe } from '../utils/helpers';
import { AnimationKeys, animations } from '../utils/animations';

type Props = {
	panelIndex: number;
	activeIndex: number;
	prevActiveIndex: number;
	isAnimating: boolean;
	animationType?: animationTypes;
	panelClassname?: string | string[];
	gridAreaValue?: string;
	handleAnimationEnd(): void;
} & typeof defaultProps;

const defaultProps = {
	animationType: {
		nextAnimation: AnimationKeys.FROM_RIGHT,
		prevAnimation: AnimationKeys.FROM_LEFT
	},
	gridAreaValue: 'panel'
	// onAnimationEnd: () => {}
};

export type animationTypes = {
	nextAnimation: AnimationKeys;
	prevAnimation: AnimationKeys;
};

export class Panel extends React.Component<Props, {}> {
	static readonly defaultProps = defaultProps;
	panel: React.RefObject<HTMLDivElement> = React.createRef();

	render() {
		const {
			activeIndex,
			panelIndex,
			panelClassname,
			gridAreaValue,
			children
		} = this.props;
		const isActive = activeIndex === panelIndex;

		const panelStyles: React.CSSProperties = {
			gridArea: gridAreaValue,
			overflow: 'hidden',
			visibility: 'hidden',
			transformStyle: 'preserve-3d',
			backfaceVisibility: 'hidden',
			willChange: 'transform',
			zIndex: isActive ? 1 : 0
		};

		// Assign prop, animation and direction classnames.
		const panelClassNames: string = pipe(
			this.assignPropClassnames,
			this.assignAnimationClassnames
		)(panelClassname).join(' ');

		return (
			<div
				style={panelStyles}
				className={panelClassNames.length ? panelClassNames : undefined}
				onAnimationEnd={this.handleAnimationEnd}
				ref={this.panel}
			>
				{children}
			</div>
		);
	}

	// Assign any classnames passed as props.
	assignPropClassnames = (panelClassname: string | string[]) => {
		let classes: string[] = [];
		if (panelClassname) {
			// handle array of classes
			if (Array.isArray(panelClassname)) {
				classes = [...panelClassname];
			} else {
				classes.push(panelClassname);
			}
		}

		return classes;
	};

	// Assign relavant animation classes based on panel animation direction
	// and which animation is applied for both prev and next actions
	assignAnimationClassnames = (classes: string[]): string[] => {
		const { activeIndex, prevActiveIndex, panelIndex } = this.props;

		const isExitingPanel = panelIndex === prevActiveIndex;
		const isEnteringPanel = panelIndex === activeIndex;
		const directionalClass = this.getDirectionalClassname(isEnteringPanel);

		let animationClasses: string[] = [];
		if (this.props.isAnimating) {
			if (isExitingPanel) {
				animationClasses = [...classes, ...directionalClass, 'isActive'];
			}
			else if (isEnteringPanel) {
				animationClasses = [...classes, ...directionalClass, 'isActive'];
			}
		}
		else if (isEnteringPanel) {
			animationClasses = [...classes, 'isActive'];
		}
		else {
			return classes;
		}

		return animationClasses;
	};

	getDirectionalClassname = (isEnteringPanel: boolean) => {
		const { activeIndex, prevActiveIndex } = this.props;

		const isAnimatingForward = activeIndex > prevActiveIndex ? true : false;
		const { enteringClass, exitingClass } = this.getAnimationType(isAnimatingForward);

		// Based on animation direction, return the corresponding animation class;
		return isEnteringPanel ? enteringClass : exitingClass;
	};

	// Retrieve the correct enter and exiting class names from animation object
	getAnimationType = (isAnimatingForward: boolean) => {
		const { nextAnimation, prevAnimation } = this.props.animationType;

		// Get Animation key based on if prev or next panel is called
		const animationKey = isAnimatingForward ? nextAnimation : prevAnimation;
		// Once we have the key -> get the containing object for that key and retrieve classnames
		const animationObj: any = animations.find((arr: any) => arr[animationKey]);
		const { enteringClass, exitingClass } = animationObj[animationKey] as any;

		return {
			enteringClass,
			exitingClass
		};
	};

	// Handle resetting of panels and any callback on animEnd
	handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>): void => {
		const { handleAnimationEnd } = this.props;
		if (e && e.target !== this.panel.current) return;

		this.resetPanels();
		if (handleAnimationEnd) {
			handleAnimationEnd();
		}
	};

	// Need to find better way to handle reset?? (too implicit?)
	resetPanels = (): void => {
		const { prevActiveIndex, panelIndex } = this.props;
		const panelNode = this.panel.current as HTMLDivElement;

		if (prevActiveIndex === panelIndex && panelNode) {
			if (panelNode.classList.contains('isActive')) {
				panelNode.classList.remove('isActive');
			}
		}
	};
}
