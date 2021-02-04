import {check, openSettings, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
export {PERMISSIONS}
export async function checkPermissions(permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, askIfDenied: boolean = true) {
    let response = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION); // <-- always blocked
    let isPermissionsGranted = false;

    console.log("req permission:" , response);
    if (response === RESULTS.GRANTED) {
        isPermissionsGranted = true;
    } else if (response === RESULTS.DENIED) {
        response = request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, {
            title: "CooltivarApp requires permission",
            message: "CooltivarApp needs access to your location to help you draw fields.",
            buttonPositive: "Ok",
            buttonNegative: "Don't show my position",
        });

        if (response === RESULTS.GRANTED) {
            isPermissionsGranted = true;
        } else if (response === RESULTS.DENIED) {
            await openSettings();
        }
    }

    return isPermissionsGranted;
}
