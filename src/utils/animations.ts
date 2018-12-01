export enum AnimationKeys {
	FROM_RIGHT = 'fromRight',
	FROM_LEFT = 'fromLeft',
	FROM_BOTTOM = 'fromBottom',
	FROM_TOP = 'fromTop',
	FROM_RIGHT_FADE = 'fromRightFade',
	FROM_LEFT_FADE = 'fromLeftFade',
	FROM_BOTTOM_FADE = 'fromBottomFade',
	FROM_TOP_FADE = 'fromTopFade',
	TO_LEFT_EASING = 'toLeftEasing',
	TO_RIGHT_EASING = 'toRightEasing',
	TO_TOP_EASING = 'toTopEasing',
	TO_BOTTOM_EASING = 'toBottomEasing',
	SCALE_DOWN_FROM_RIGHT = 'scaleDownFromRight',
	SCALE_DOWN_FROM_LEFT = 'scaleDownFromLeft',
	SCALE_DOWN_FROM_TOP = 'scaleDownFromTop',
	SCALE_DOWN_FROM_BOTTOM = 'scaleDownFromBottom',
	CUBE_TO_LEFT = 'cubeToLeft',
	CUBE_TO_RIGHT = 'cubeToRight'
	// CUBE_TO_TOP = 'cubeToTop', -- not complete
	// CUBE_TO_BOTTOM = 'cubeToBottom' -- not complete
}

// fix
export type animationData = {[key in AnimationKeys]?: { enteringClass: string[], exitingClass: string[]}};
export const animations = [
	{
		[AnimationKeys.FROM_RIGHT]: {
			enteringClass: ['fromRight'],
			exitingClass: ['toLeft']
		}
	},
	{
		fromLeft: {
			enteringClass: ['fromLeft'],
			exitingClass: ['toRight']
		}
	},
	{
		fromBottom: {
			enteringClass: ['fromBottom'],
			exitingClass: ['toTop']
		}
	},
	{
		fromTop: {
			enteringClass: ['fromTop'],
			exitingClass: ['toBottom']
		}
	},
	{
		fromRightFade: {
			enteringClass: ['fromRightFade'],
			exitingClass: ['toLeftFade']
		}
	},
	{
		fromLeftFade: {
			enteringClass: ['fromLeftFade'],
			exitingClass: ['toRightFade']
		}
	},
	{
		fromBottomFade: {
			enteringClass: ['fromBottomFade'],
			exitingClass: ['toTopFade']
		}
	},
	{
		fromTopFade: {
			enteringClass: ['fromTopFade'],
			exitingClass: ['toBottomFade']
		}
	},
	{
		toLeftEasing: {
			enteringClass: ['fromRight'],
			exitingClass: ['toLeftEasing', 'onTop']
		}
	},
	{
		toRightEasing: {
			enteringClass: ['fromLeft'],
			exitingClass: ['toRightEasing', 'onTop']
		}
	},
	{
		toTopEasing: {
			enteringClass: ['fromBottom'],
			exitingClass: ['toTopEasing', 'onTop']
		}
	},
	{
		toBottomEasing: {
			enteringClass: ['fromTop'],
			exitingClass: ['toBottomEasing', 'onTop']
		}
	},
	{
		scaleDownFromRight: {
			enteringClass: ['fromRight', 'onTop'],
			exitingClass: ['scaleDown']
		}
	},
	{
		scaleDownFromLeft: {
			enteringClass: ['fromLeft', 'onTop'],
			exitingClass: ['scaleDown']
		}
	},
	{
		scaleDownFromTop: {
			exitingClass: ['scaleDown'],
			enteringClass: ['fromTop', 'onTop']
		}
	},
	{
		scaleDownFromBottom: {
			exitingClass: ['scaleDown'],
			enteringClass: ['fromBottom', 'onTop']
		}
	},
	{
		cubeToLeft: {
			enteringClass: ['cubeLeftIn'],
			exitingClass: ['cubeLeftOut', 'onTop']
		}
	},
	{
		cubeToRight: {
			enteringClass: ['cubeRightIn'],
			exitingClass: ['cubeRightOut', 'onTop']
		}
	},
	{
		cubeToTop: {
			enteringClass: ['cubeTopIn'],
			exitingClass: ['cubeTopOut', 'onTop']
		}
	},
	{
		cubeToBottom: {
			enteringClass: ['cubeBottomIn'],
			exitingClass: ['cubeBottomOut', 'onTop']
		}
	}
];
