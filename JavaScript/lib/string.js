export function onlyInputPrice(price) {
    return price.replace(/[^\d\.]/g, '')
                .replace(/(\.(?:\d{1,2})?)[^\d]/g,'$1')
                .replace(/^(\d+\.\d{2})([\s\S])+$/g, '$1')
                .replace(/^(\.\d{1,2})$/g, '0$1')
                .replace(/^0([1-9][\.\d]*)$/, '$1')
}
