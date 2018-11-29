import * as React from 'react';
import { isFunction } from '../utils/helpers';

// Declare props & state types
type Props = {
	slideTotal: number;
	gridProperties?: keyof GridProperties;
	children?: RenderCallback;
	render?: RenderCallback;
} & typeof defaultProps;

export type GridProperties = {
	columnSizes?: string;
	rowSizes?: string;
	templateArea?: string[];
};

type State = typeof initialState;

// Declare default props/initial state
const defaultProps = {
	gridProperties: { columnSizes: '1fr', rowSizes: 'auto', templateArea: [''] }
};

const initialState = {
	prevActiveIndex: 0,
	activeIndex: 0,
	isAnimating: false
};

type RenderCallback = (args: RenderProps) => JSX.Element;
export type RenderProps = {
	activeIndex: State['activeIndex'];
	prevActiveIndex: State['prevActiveIndex'];
	isAnimating: State['isAnimating'];
	prevSlide: PanelContainer['onPrevSlide'];
	nextSlide: PanelContainer['onNextSlide'];
	handleAnimationEnd: PanelContainer['handleAnimationEnd'];
};

export class PanelContainer extends React.Component<Props, State> {
	readonly state = initialState;
	static readonly defaultProps = defaultProps;

	// ref for container node
	container: HTMLDivElement;

	shouldComponentUpdate(nextProps: Props, nextState: State) {
		return (
			nextState.activeIndex !== this.state.activeIndex ||
			nextState.isAnimating !== this.state.isAnimating ||
			nextProps.slideTotal !== this.props.slideTotal
		);
	}

	render() {
		const { children, render } = this.props;
		const { activeIndex, prevActiveIndex, isAnimating } = this.state;

		const renderProps: RenderProps = {
			activeIndex,
			prevActiveIndex,
			isAnimating,
			handleAnimationEnd: this.handleAnimationEnd,
			prevSlide: this.onPrevSlide,
			nextSlide: this.onNextSlide
		};

		const defaultStyles: React.CSSProperties = {
			display: 'grid',
			position: 'relative',
			overflow: 'hidden',
			perspective: '1200px'
		};

		const propStyles: React.CSSProperties = this.assignGridValues();
		const finalStyles = {
			...defaultStyles,
			...propStyles
		};

		return (
			<div
				style={finalStyles}
				className="panel-container"
				ref={el => (this.container = el as HTMLDivElement)}
			>
				{render
					? render(renderProps)
					: isFunction(children)
						? children(renderProps)
						: null}
			</div>
		);
	}

	assignGridValues = (): React.CSSProperties => {
		const { columnSizes, rowSizes, templateArea } = this.props.gridProperties;
		let obj: React.CSSProperties = {
			gridTemplateColumns: columnSizes,
			gridTemplateRows: rowSizes
		};

		// For grid-template-areas prop, syntax needs to be "'value' 'value'" etc to be interpreted correctly.
		if (templateArea && templateArea.length) {
			let templateString: string = '';
			templateArea.forEach((val: string) => (templateString += `'${val}' `));

			return {
				...obj,
				gridTemplateAreas: `${templateString}`
			};
		}
		return obj;
	};

	onPrevSlide = (): void => {
		if (this.state.isAnimating || this.props.slideTotal < 2) {
			return;
		}

		this.setState(prevState => {
			if (prevState.activeIndex === 0) {
				return prevState;
			} else {
				return {
					...prevState,
					isAnimating: true,
					prevActiveIndex: prevState.activeIndex,
					activeIndex: prevState.activeIndex - 1
				};
			}
		});
	};

	// handle next slide
	onNextSlide = (): void => {
		if (this.state.isAnimating || this.props.slideTotal < 2) {
			return;
		}

		this.setState(prevState => {
			if (prevState.activeIndex === this.props.slideTotal - 1) {
				return prevState;
			} else {
				return {
					...prevState,
					isAnimating: true,
					prevActiveIndex: prevState.activeIndex,
					activeIndex: prevState.activeIndex + 1
				};
			}
		});
	};

	handleAnimationEnd = (): void => {
		this.setState({
			isAnimating: false
		});
	};
}
