export enum ValidationTypes {
    emailValidation = "emailInput",
    TCKNValidation = "TCNoInput",
    phoneValidation = "phoneInput",
    passwordValidation = "passwordInput"
}

const inputValidation = (type: string, input: string) => {
    if (type === ValidationTypes.emailValidation) {
        return validateEmail(input)
    } else if (type === ValidationTypes.TCKNValidation) {
        return TCNOKontrol(input)
    } else if (type === ValidationTypes.passwordValidation) {
        return validatePassword(input)
    } else if (type === ValidationTypes.phoneValidation) {
        return (validatePhone(input))
    }
}

export default inputValidation;

const TCNOKontrol = (TCNO: string) => {
    var tek = 0,
        cift = 0,
        sonuc = 0,
        TCToplam = 0,
        i = 0,
        hatali = [11111111110, 22222222220, 33333333330, 44444444440, 55555555550, 66666666660, 7777777770, 88888888880, 99999999990];

    if (TCNO.length !== 11) return "Geçerli bir TCKN giriniz.";
    if (isNaN(Number(TCNO))) return "Geçerli bir TCKN giriniz.";
    if (TCNO[0] === "0") return "Geçerli bir TCKN giriniz.";

    tek = parseInt(TCNO[0]) + parseInt(TCNO[2]) + parseInt(TCNO[4]) + parseInt(TCNO[6]) + parseInt(TCNO[8]);
    cift = parseInt(TCNO[1]) + parseInt(TCNO[3]) + parseInt(TCNO[5]) + parseInt(TCNO[7]);

    tek = tek * 7;
    sonuc = Math.abs(tek - cift);
    if (sonuc % 10 !== Number(TCNO[9])) return "Geçerli bir TCKN giriniz.";

    for (var j = 0; j < 10; j++) {
        TCToplam += parseInt(TCNO[j]);
    }

    if (TCToplam % 10 !== Number(TCNO[10])) return "Geçerli bir TCKN giriniz.";

    if (hatali.toString().indexOf(TCNO) != -1) return "Geçerli bir TCKN giriniz.";

    return true;
}

const validateEmail = (email: string) => {
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (String(email).match(regex)) {
        return true
    } else {
        return "Geçerli bir email adresi giriniz."
    }
};

const validatePhone = (value: string) => {

}

const validatePassword = (value: string) => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
        return "Bu alanı boş bırakmayınız.";
    }

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
        return "Şifreniz en az bir tane büyük karakter içermeli.";
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
        return "Şifreniz en az bir tane küçük karakter içermeli.";
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
        return "Şifreniz en az bir tane sayı içermeli.";
    }

    const isContainsSymbol =
        /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    if (!isContainsSymbol.test(value)) {
        return "Şifreniz en az bir tane özel karakter içermeli.";
    }

    const isValidLength = /^.{10,16}$/;
    if (!isValidLength.test(value)) {
        return "Şifrenizin uzunluğu en az 10 en fazla 16 karakter olabilir.";
    }

    return true;
}