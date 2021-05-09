function handleChangeAutoComplete(e, stateSetter, state ){
    if(e.target.value === ""){
        stateSetter(state =>[]);
        return;
    }
    const regValue = new RegExp(`${e.target.value}`);
    const matchArr = state.filter( el => regValue.test(el));
    stateSetter(fetchComplete =>[...matchArr]);
}

export { handleChangeAutoComplete }