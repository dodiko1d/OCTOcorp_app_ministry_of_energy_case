import { languagePluginLoader } from './pyodide';

let pythonWrapper = function (func, loadNumpy = false, func_params = {}) {
    languagePluginLoader.then(() => {
        if (!loadNumpy) { func(pyodide, ...func_params); }
        else {
            pyodide.loadPackage('numpy').then(() => {
                func(pyodide, func_params);
            })
        }
    });
}

export { pythonWrapper }

