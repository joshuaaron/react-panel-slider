import * as React from 'react';
import { Panel, animationTypes } from './components/Panel'
import { PanelContainer, RenderProps } from './components/PanelContainer';
import { AnimationKeys } from './utils/animations';
import { PanelControls } from './components/ControlWrapper';
import './App.css';

// Change these with any keys from animationTypes:
const animationType: animationTypes = {
	nextAnimation: AnimationKeys.TO_LEFT_EASING,
	prevAnimation: AnimationKeys.CUBE_TO_RIGHT
};

// Change the order of these or nest controls in slide if desired and remove this prop entirely
// FIX THIS ANY TYPING
const gridProps: any = {
	templateArea: ['slide', 'controls']
}

// PanelContainer allows render={(args =>)} or child as function
const App = () => (
	<div className="app">
		<PanelContainer
			slideTotal={3}
			gridProperties={gridProps}
			render={({ prevSlide, nextSlide, ...props }: RenderProps) => (
				<React.Fragment>
					{items.map((item: demoItem, index: number) => (
						<Panel
							key={item.title}
							slideIndex={index}
							animationType={animationType}
							slideClassname="panel"
							{...props}
						>
							<React.Fragment>
								<h3>{item.title}</h3>
								<div>{item.content}</div>
							</React.Fragment>
						</Panel>
					))}
					<PanelControls>
						<button onClick={prevSlide}>Prev</button>
						<button onClick={nextSlide}>Next</button>
					</PanelControls>
				</React.Fragment>
			)}
		/>
	</div>
);

type demoItem = {
	title: string;
	content: JSX.Element;
};
const items: demoItem[] = [
	{
		title: 'Title One',
		content: (
			<div>
				Horses can sleep both lying down and standing up. Domestic horses have a
				lifespan of around 25 years. A 19th century horse named 'Old Billy' is
				said to have lived 62 years.
			</div>
		)
	},
	{
		title: 'Title Two',
		content: (
			<div>
				Rhino skin maybe thick but it can be quite sensitive to sunburns and
				insect bites which is why they like wallow so much – when the mud dries
				it acts as protection from the sunburns and insects.
			</div>
		)
	},
	{
		title: 'Title Three',
		content: (
			<div>
				If you’re looking to hunt a unicorn, but don’t know where to begin, try
				Lake Superior State University in Sault Ste. Marie, Michigan. Since
				1971, the university has issued permits to unicorn questers.
			</div>
		)
	}
];

export default App;
