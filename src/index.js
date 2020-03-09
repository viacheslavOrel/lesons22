const REQUEST_STRING = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange';
const $preloader = document.querySelector('#preloader');
const $converter = document.querySelector('#converter');

const $inputForm = $converter.querySelector('#inputData');
const $inputFormSelect = $inputForm.querySelector('select');
const $inputFormValue = $inputForm.querySelector('input');
const $inputFormSpan = $inputForm.querySelector('span');

const $resultForm = $converter.querySelector('#resultData');
const $resultFormSelect = $resultForm.querySelector('select');
const $resultFormValue = $resultForm.querySelector('input');
const $resultFormSpan = $resultForm.querySelector('span');


fetch(`${REQUEST_STRING}?json`)
    .then(result => result.json())
    .then(result => {
        $preloader.classList.add('hidden');
        $converter.classList.remove('hidden');

        const currency = result
            .reduce((acc, item) => acc + `<option data-cost="${item.rate}" data-symbol="${item.cc}">${item.txt}</option>`,
                '<option data-cost="1" data-symbol="UAH">Українська гривня</option>');

        $inputFormSelect.innerHTML = currency;
        $inputFormSpan.textContent = $inputFormSelect.selectedOptions[0].dataset.symbol;

        $resultFormSelect.innerHTML = currency;
        $resultFormSpan.textContent = $inputFormSelect.selectedOptions[0].dataset.symbol;

        $inputForm.addEventListener('change', event => {
            convert();
            if (event.target.tagName === 'SELECT') {
                $inputFormSpan.textContent = $inputFormSelect.selectedOptions[0].dataset.symbol;
            }
        });

        $resultFormSelect.addEventListener('change', () => {
                convert();
            $resultFormSpan.textContent = $resultFormSelect.selectedOptions[0].dataset.symbol;
        });

    });

function convert() {
    $resultFormValue.valueAsNumber = $inputFormValue.valueAsNumber
        * parseFloat($inputFormSelect.selectedOptions[0].dataset.cost)
        / parseFloat($resultFormSelect.selectedOptions[0].dataset.cost);
}