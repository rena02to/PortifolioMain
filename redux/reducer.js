const initialState = {
    enAtivo: false,
    modoEscuro: false,
    itemAtivo: 1,
    windowSize: 0,
    menuOpen: false,
    settingOpen: false,
    enviado: false,
    enviando: false,
    sendEmail: false,
    helpOpen: false,
    descricao: 'descricaoDefault',
    tecnologiaAtiva: 0,
    statusTecnologiaAtiva: 'Unlocked',
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
        case 'Enviado':
            return {...state, enviado: action.payload}
        case 'Enviando':
            return {...state, enviando: !state.enviando}
        case 'SendEmail':
            return {...state, sendEmail: !state.sendEmail}
        case 'HelpOpen':
            return {...state, helpOpen: action.payload}
        case 'setDescricao':
            return {...state, descricao: action.payload}
        case 'setTecnologiaAtiva':
            return {...state, tecnologiaAtiva: action.payload}
        case 'setStatusTecnologiaAtiva':
            return {...state, statusTecnologiaAtiva: action.payload}
        default:
            return state;
    }
}

export default useReducer