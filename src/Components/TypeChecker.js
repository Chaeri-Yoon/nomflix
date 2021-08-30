import {checkPropTypes} from "prop-types";

const typeChecker = ({...props}, propTypes) => checkPropTypes(propTypes, {...props}, 'prop', '');
export default typeChecker;