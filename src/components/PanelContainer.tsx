import * as React from 'react';
import { isFunction } from '../utils/helpers';

// Declare props & state types
type Props = {
	panelTotal: number;
	children?: RenderCallback;
	render?: RenderCallback;
} & typeof defaultProps;

type RenderCallback = (args: ConsumerProps) => React.ReactNode;
type State = Readonly<typeof initialState>;

const defaultProps = {
	gridProperties: { columnSizes: '1fr', rowSizes: 'auto', templateArea: [''] } as GridProperties
};

const initialState = {
	prevActiveIndex: 0,
	activeIndex: 0,
	isAnimating: false,
};

export type GridProperties = {
	columnSizes: string;
	rowSizes: string;
	templateArea: string[];
};

export type ConsumerProps = {
	activeIndex: State['activeIndex'];
	prevActiveIndex: State['prevActiveIndex'];
	isAnimating: State['isAnimating'];
	prevPanel: PanelContainer['onPrevPanel'];
	nextPanel: PanelContainer['onNextPanel'];
	handleAnimationEnd: PanelContainer['handleAnimationEnd'];
};

export class PanelContainer extends React.Component<Props, State> {
	static readonly defaultProps = defaultProps;
	state = initialState;

	container: React.RefObject<HTMLDivElement> = React.createRef();

	shouldComponentUpdate(nextProps: Props, nextState: State) {
		return (
			nextState.activeIndex !== this.state.activeIndex ||
			nextState.isAnimating !== this.state.isAnimating ||
			nextProps.panelTotal !== this.props.panelTotal
		);
	}

	render() {
		const { children, render } = this.props;
		const { activeIndex, prevActiveIndex, isAnimating } = this.state;

		const renderProps: ConsumerProps = {
			activeIndex,
			prevActiveIndex,
			isAnimating,
			handleAnimationEnd: this.handleAnimationEnd,
			prevPanel: this.onPrevPanel,
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
		const propStyles: React.CSSProperties = this.assignGridValues();
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

	// handle animating to previous panel
	onPrevPanel = (): void => {
		if (this.state.isAnimating || this.props.panelTotal < 2) {
			return;
		}

		this.setState(prevState => {
			if (prevState.activeIndex === 0) {
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

	// handle animating to next panel
	onNextPanel = (): void => {
		if (this.state.isAnimating || this.props.panelTotal < 2) {
			return;
		}

		this.setState(prevState => {
			if (prevState.activeIndex === this.props.panelTotal - 1) {
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

	/** Set isAnimating to false once slides have finished animating */
	handleAnimationEnd = (): void => {
		this.setState({
			isAnimating: false
		});
	};

	/** Throw an error if neither children or render prop are provided as functions */
	throwRenderError = (): Error => {
		throw new Error('You must provide either children or the render prop. Both need to be of type Function.')
	}
}
