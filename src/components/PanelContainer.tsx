import * as React from 'react';
import { isFunction } from '../utils/helpers';

type Props = {
	panelTotal: number;
	defaultActiveIndex?: number;
	templateArea?: string[];
	children?: RenderCallback;
	render?: RenderCallback;
	onAnimationEnd?: () => void;
};

type State = Readonly<{
	activeIndex: number,
	prevActiveIndex: number,
	isAnimating: boolean
}>;

const getInitialState = (props: Props): State => {
	const { defaultActiveIndex, panelTotal } = props;
	const indexIsInBounds = defaultActiveIndex !== undefined && defaultActiveIndex < panelTotal;

	return {
		prevActiveIndex: (indexIsInBounds && defaultActiveIndex !== 0) ? defaultActiveIndex! - 1 : 0,
		activeIndex: (indexIsInBounds && defaultActiveIndex) || 0,
		isAnimating: false,
	};
}

type RenderCallback = (args: ConsumerProps) => React.ReactNode;

export type ConsumerProps = {
	activeIndex: State['activeIndex'];
	prevActiveIndex: State['prevActiveIndex'];
	isAnimating: State['isAnimating'];
	prevPanel: PanelContainer['onPreviousPanel'];
	nextPanel: PanelContainer['onNextPanel'];
	handleAnimationEnd: PanelContainer['handleAnimationEnd'];
};

export class PanelContainer extends React.Component<Props, State> {
	state = getInitialState(this.props);

	container: React.RefObject<HTMLDivElement> = React.createRef();
	animationCallbackCount: number = 0;

	shouldComponentUpdate(nextProps: Props, nextState: State) {
		const { activeIndex, isAnimating } = this.state;
		return (
			nextState.activeIndex !== activeIndex ||
			nextState.isAnimating !== isAnimating ||
			nextProps.panelTotal !== this.props.panelTotal
		);
	}

	render() {
		const { children, render, templateArea } = this.props;
		const { activeIndex, prevActiveIndex, isAnimating } = this.state;

		const renderProps: ConsumerProps = {
			activeIndex,
			prevActiveIndex,
			isAnimating,
			handleAnimationEnd: this.handleAnimationEnd,
			prevPanel: this.onPreviousPanel,
			nextPanel: this.onNextPanel,
		};

		// Default styles for the container
		const defaultStyles: React.CSSProperties = {
			display: 'grid',
			position: 'relative',
			overflow: 'hidden',
			perspective: '1200px'
		};

		// Assign the grid values from props
		const propStyles = templateArea && templateArea.length ? this.assignGridValues(templateArea) : {};
		const finalStyles = {
			...defaultStyles,
			...propStyles
		};

		return (
			<div
				style={finalStyles}
				className="panel-container"
				ref={this.container}
			>
				{render
					? render(renderProps)
					: isFunction(children)
						? children(renderProps)
						: this.throwRenderError()}
			</div>
		);
	}

	// Add the passed in grid value props ans construct the template area string correctly
	assignGridValues = (templateArea: string[]): React.CSSProperties => {

		// For grid-template-areas prop, syntax needs to be "'value' 'value'" to be interpreted correctly.
		let templateString: string = '';
		templateArea.forEach((val: string) => (templateString += `'${val}' `));

		return {
			gridTemplateAreas: `${templateString}`
		};
	};

		/** 
	 * Method fired when animating to the previous panel.
	 * Checks whether panels are currently animating and it's index position.
	 * to handle when we are at the first panel.
	 */
	onPreviousPanel = (): void => {
		if (this.props.panelTotal < 2) {
			return;
		}

		this.setState(prevState => {
			if (prevState.activeIndex === 0 || prevState.isAnimating) {
				return prevState;
			}
			else {
				return {
					...prevState,
					isAnimating: true,
					prevActiveIndex: prevState.activeIndex,
					activeIndex: prevState.activeIndex - 1
				};
			}
		});
	};

	/** 
	 * Method fired when animating to the next panel.
	 * Checks whether panels are currently animating and it's index position.
	 * to handle when we are at the final panel.
	 */
	onNextPanel = (): void => {
		if (this.props.panelTotal < 2) {
			return;
		}

		this.setState(prevState => {
			if (prevState.activeIndex === this.props.panelTotal - 1 || prevState.isAnimating) {
				return prevState;
			}
			else {
				return {
					...prevState,
					isAnimating: true,
					prevActiveIndex: prevState.activeIndex,
					activeIndex: prevState.activeIndex + 1
				};
			}
		});
	};

	/**
	 * Set isAnimating to false once slides have finished animating
	 * Since this event fires twice each animation from both panels, we add a check to 
	 * see if it's already been called once before firing. We can assume now switching between
	 * the count value of 0 and 1 will suffice.
	 */
	handleAnimationEnd = (): void => {
		const { onAnimationEnd } = this.props;
		this.setState({
			isAnimating: false
		},
		() => {
			if (this.animationCallbackCount === 0 && onAnimationEnd) {
				this.animationCallbackCount++;
				onAnimationEnd();
			}
			else {
				this.animationCallbackCount = 0;
			}
		});
	};

	/** Throw an error if neither children or render prop are provided as functions */
	throwRenderError = (): Error => {
		throw new Error('You must provide either children or the render prop. Both need to be of type Function.')
	}
}
