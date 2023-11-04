const initialState = {
    enAtivo: false,
    modoEscuro: false,
    itemAtivo: 1,
    windowSize: 0,
    menuOpen: false,
    settingOpen: false,
}

const useReducer = (state = initialState, action) => {
    switch (action.type){
        case 'ChangeLanguage':
            return {...state, enAtivo: !state.enAtivo}
        case 'ChangeModoEscuro':
            return {...state, modoEscuro: !state.modoEscuro}
        case 'ChangeItemAtivo':
            return {...state, itemAtivo: action.payload}
        case 'ChangeWindowSize':
            return {...state, windowSize: action.payload}
        case 'MenuOpen':
            return {...state, menuOpen: !state.menuOpen}
        case 'SettingsOpen':
            return {...state, settingOpen: !state.settingOpen}
        case 'MenuClose':
            return {...state, menuOpen: false}
        case 'SettingsClose':
            return {...state, settingOpen: false}
        default:
            return state;
    }
}

export default useReducer