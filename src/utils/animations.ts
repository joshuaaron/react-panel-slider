// To use this as a key index, it must be "const"!
export const enum AnimationKeys {
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

export type AnimationOptions = {
	enteringClass: string[];
	exitingClass: string[];
}

// REFACTOR NOTES:
// to require a single key, look into Pick<T, Exclude<keyof T, K>> in the documentation:
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
export type AnimationData = {
	// Have to say that the key is ?-optional or else your objects will expect ALL of the directions
	[key in AnimationKeys]?: AnimationOptions
}

export const animations: AnimationData[] = [
	{
		[AnimationKeys.FROM_RIGHT]: {
			enteringClass: ['fromRight'],
			exitingClass: ['toLeft']
		}
	},
	{
		[AnimationKeys.FROM_LEFT]: {
			enteringClass: ['fromLeft'],
			exitingClass: ['toRight']
		}
	},
	{
		[AnimationKeys.FROM_BOTTOM]: {
			enteringClass: ['fromBottom'],
			exitingClass: ['toTop']
		}
	},
	{
		[AnimationKeys.FROM_TOP]: {
			enteringClass: ['fromTop'],
			exitingClass: ['toBottom']
		}
	},
	{
		[AnimationKeys.FROM_RIGHT_FADE]: {
			enteringClass: ['fromRightFade'],
			exitingClass: ['toLeftFade']
		}
	},
	{
		[AnimationKeys.FROM_LEFT_FADE]: {
			enteringClass: ['fromLeftFade'],
			exitingClass: ['toRightFade']
		}
	},
	{
		[AnimationKeys.FROM_BOTTOM_FADE]: {
			enteringClass: ['fromBottomFade'],
			exitingClass: ['toTopFade']
		}
	},
	{
		[AnimationKeys.FROM_TOP_FADE]: {
			enteringClass: ['fromTopFade'],
			exitingClass: ['toBottomFade']
		}
	},
	{
		[AnimationKeys.TO_LEFT_EASING]: {
			enteringClass: ['fromRight'],
			exitingClass: ['toLeftEasing', 'onTop']
		}
	},
	{
		[AnimationKeys.TO_RIGHT_EASING]: {
			enteringClass: ['fromLeft'],
			exitingClass: ['toRightEasing', 'onTop']
		}
	},
	{
		[AnimationKeys.TO_TOP_EASING]: {
			enteringClass: ['fromBottom'],
			exitingClass: ['toTopEasing', 'onTop']
		}
	},
	{
		[AnimationKeys.TO_BOTTOM_EASING]: {
			enteringClass: ['fromTop'],
			exitingClass: ['toBottomEasing', 'onTop']
		}
	},
	{
		[AnimationKeys.SCALE_DOWN_FROM_RIGHT]: {
			enteringClass: ['fromRight', 'onTop'],
			exitingClass: ['scaleDown']
		}
	},
	{
		[AnimationKeys.SCALE_DOWN_FROM_LEFT]: {
			enteringClass: ['fromLeft', 'onTop'],
			exitingClass: ['scaleDown']
		}
	},
	{
		[AnimationKeys.SCALE_DOWN_FROM_TOP]: {
			exitingClass: ['scaleDown'],
			enteringClass: ['fromTop', 'onTop']
		}
	},
	{
		[AnimationKeys.SCALE_DOWN_FROM_BOTTOM]: {
			exitingClass: ['scaleDown'],
			enteringClass: ['fromBottom', 'onTop']
		}
	},
	{
		[AnimationKeys.CUBE_TO_LEFT]: {
			enteringClass: ['cubeLeftIn'],
			exitingClass: ['cubeLeftOut', 'onTop']
		}
	},
	{
		[AnimationKeys.CUBE_TO_RIGHT]: {
			enteringClass: ['cubeRightIn'],
			exitingClass: ['cubeRightOut', 'onTop']
		}
	},
	// {
	// 	cubeToTop: {
	// 		enteringClass: ['cubeTopIn'],
	// 		exitingClass: ['cubeTopOut', 'onTop']
	// 	}
	// },
	// {
	// 	cubeToBottom: {
	// 		enteringClass: ['cubeBottomIn'],
	// 		exitingClass: ['cubeBottomOut', 'onTop']
	// 	}
	// }
];
