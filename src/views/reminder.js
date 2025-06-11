export default function reminder(origProducer, timeOut, callback) {
    const orig = origProducer();

    let retryCount = 0;

    const logic = () => {
        ++retryCount;
        if (retryCount > 3) {
            return;
        }
        const newVal = origProducer();
        if (newVal !== orig) {
            return;
        }
        if (navigator.vibrate) {
            navigator.vibrate([
                100, 200, 100, 200, 100
            ]);
        }
        if (callback) {
            callback();
        }
        setTimeout(logic, timeOut/2);
    };
    setTimeout(logic, timeOut);
}
