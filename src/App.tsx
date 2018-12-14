import * as React from 'react';
import { Panel, animationTypes } from './components/Panel'
import { PanelContainer, ConsumerProps, GridProperties } from './components/PanelContainer';
import { AnimationKeys } from './utils/animations';
import { ControlWrapper } from './components/ControlWrapper';
import './App.css';

// Change these with any keys from animationTypes:
const animationType: animationTypes = {
	nextAnimation: AnimationKeys.TO_LEFT_EASING,
	prevAnimation: AnimationKeys.CUBE_TO_RIGHT
};

const gridProps: GridProperties = {
	columnSizes: '1fr',
	rowSizes: 'auto',
	templateArea: ['panel', 'controls']
}

// PanelContainer allows render={(args =>)} or children as function
const App = () => (
	<div className="app">
		<PanelContainer panelTotal={3} gridProperties={gridProps}>
			{({ prevPanel, nextPanel, ...props }: ConsumerProps) => (
				<>
					{items.map((item: demoItem, index: number) => (
						<Panel
							key={item.title}
							panelIndex={index}
							animationType={animationType}
							panelClassname="panel"
							{...props}
						>
							<>
								<h3>{item.title}</h3>
								<div>{item.content}</div>
							</>
						</Panel>
					))}
					<ControlWrapper>
						<button onClick={prevPanel}>Prev</button>
						<button onClick={nextPanel}>Next</button>
					</ControlWrapper>
				</>
			)}
		</PanelContainer>
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
