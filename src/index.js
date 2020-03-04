const REQUEST_STRING = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange';
const $inComboBox = document.querySelector('.converter__inVar select');
const $outComboBox = document.querySelector('.converter__outVar select');
const $inInput = document.querySelector('.converter__inVar input');
const $outInput = document.querySelector('.converter__outVar input');
console.log('test');

fetch(`${REQUEST_STRING}?json`)
    .then(result => result.json())
    .then(result => {
        const $selectionOptions = result.sort((obj1, obj2) => {
            const name1 = obj1.txt.toUpperCase();
            const name2 = obj2.txt.toUpperCase();
            if (name1 < name2) return -1;
            else if (name1 > name2) return +1;
            else return 0;
        }).reduce((acc, item) => acc + `<option data-cost="${item.rate}">${item.txt}</option>`,
            '<option data-cost="1.00">Українська гривня</option>');

        $inComboBox.insertAdjacentHTML('beforeend', $selectionOptions);
        $outComboBox.insertAdjacentHTML('beforeend', $selectionOptions);

        document.querySelector('.converter__inVar')
            .addEventListener('change', () => {
                convert(true);
            });
        document.querySelector('.converter__outVar')
            .addEventListener('change', () => {
                convert(false);
            });
    });

function convert(inVarToOutVar) {
    if (inVarToOutVar) {
        $outInput.value =
            (parseFloat($inInput.value) * parseFloat($inComboBox.selectedOptions[0].dataset.cost)
                / parseFloat($outComboBox.selectedOptions[0].dataset.cost))
                .toFixed(2);
    } else {
        $inInput.value =
            (parseFloat($outInput.value) * parseFloat($outComboBox.selectedOptions[0].dataset.cost)
                / parseFloat($inComboBox.selectedOptions[0].dataset.cost))
                .toFixed(2);
    }
}