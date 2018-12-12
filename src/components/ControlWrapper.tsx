import * as React from 'react';

// You don't need to wrap the controls in this but it's a convenience
// component that assigns the gridArea value for you.
type Props = {
	gridAreaValue?: string,
}
const ControlWrapper: React.SFC<Props> = ({
	gridAreaValue = 'controls',
	children
}): React.ReactElement<any> => {
	const propStyles: React.CSSProperties = {
		position: 'relative',
		gridArea: gridAreaValue
	};
	return <div style={propStyles}>{children}</div>;
}

export { ControlWrapper };
