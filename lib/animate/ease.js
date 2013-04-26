/**
 * @author: xuweichen
 * @date: 13-3-21 下午4:26
 * @descriptions
 */
(function(J, undefined){

    return J.Ease = {
        "linear": [0.250, 0.250, 0.750, 0.750],
        "easeIn": [0.420, 0.000, 1.000, 1.000],
        "easeOut": [0.000, 0.000, 0.580, 1.000],
        "easeInOut": [0.420, 0.000, 0.580, 1.000],
        "custom": [0.000, 0.350, 0.500, 1.300],
        "random": [Math.random().toFixed(3),
            Math.random().toFixed(3),
            Math.random().toFixed(3),
            Math.random().toFixed(3)]
    }

})(J);