import { Constants } from '../resources/constants/Constants';

export function selectedScreen(screen) {
	return {
		type: Constants.actionTypes.SELECTED_SCREEN,
		selectedScreen: screen
	};
}
