document.addEventListener("DOMContentLoaded", function () {
    DesabilitarCampos();
});



document.getElementById("adicionar").addEventListener("click", function () {
    Adicionar();
});

async function Adicionar() {

    let erros = "";
    let tipo = document.getElementById("tipo").value;
    let nome = "";
    let sobrenome = "";
    let cpf = "";
    let data = "";
    let razaoSocial = "";
    let nomeFantasia = "";
    let cnpj = "";

    
    if (tipo == "F") {
         nome = document.getElementById("txtNome").value;
        if (nome == "") {
            erros = "Preencha o Nome!";
        }
        sobrenome = document.getElementById("txtSobrenome").value;
        if (sobrenome == "") {
            erros += "</br>Preencha o Sobrenome!";
        }
        cpf = document.getElementById("txtCpf").value;
        if (cpf.length < 14 || cpf.length > 14) {
            erros += "</br>Preencha o CPF corretamente!";
        }
         data = document.getElementById("dtNascimento").value;
        if (data.length == 0) {
            erros += "</br>Preencha a data!";
        }
        let idade = calculaIdade(data);
        if (idade < 19) {
            erros += "</br>A idade de uma pessoa física deve ser maior de 19 anos!";
        }

    } else
        if (tipo == "J"){
             razaoSocial = document.getElementById("txtRazaoSocial").value;
            if (razaoSocial == "") {
                erros = "Preencha a Razão Social!";
            }
             nomeFantasia = document.getElementById("txtNomeFantasia").value;
            if (nomeFantasia == "") {
                erros += "</br> Preencha o Nome Fantasia!";
            }
             cnpj = document.getElementById("txtCnpj").value;
            if (cnpj.length < 18 || cnpj.length > 18) {
                erros += "</br> Preencha o  CNPJ!";
            }
        }

    let cep = document.getElementById("txtCep").value;
    if (cep.length < 8 || cep.length > 9) {
        erros += "</br>Preencha o CEP!";
    }
    let logradouro = document.getElementById("txtLogradouro").value;
    if (logradouro == "") {
        erros += "</br>Preencha o Logradouro!";
    }
    let numero = document.getElementById("txtNumero").value;
    if (numero == "") {
        erros += "</br>Preencha o número!";
    }
    let complemento = document.getElementById("txtComplemento").value;
    let bairro = document.getElementById("txtBairro").value;
    if (bairro == "") {
        erros += "</br>Preencha o bairro!";
    }
    let cidade = document.getElementById("txtCidade").value;
    if (cidade == "") {
        erros += "</br>Preencha a cidade!";
    }
    let uf = document.getElementById("txtUf").value;
    if (uf == "") {
        erros += "</br>Preencha o estado (UF)!";
    }

    if (erros.length == 0) {

        let dto = {};
        if (tipo == "F") {
             dto  = {
                 PessoaJuridicaFisica: tipo,
                 CEP: cep,
                 Logradouro: logradouro,
                 Numero: numero,
                 Complemento: complemento,
                 Bairro: bairro,
                 Cidade: cidade,
                 Uf: uf,
                 Nome: nome,
                 Sobrenome: sobrenome,
                 Cpf: cpf,
                 DataNascimento: data
            }
        }
        else {
            dto  = {
                PessoaJuridicaFisica: tipo,
                CEP: cep,
                Logradouro: logradouro,
                Numero: numero,
                Complemento: complemento,
                Bairro: bairro,
                Cidade: cidade,
                Uf: uf,
                RazaoSocial: razaoSocial,
                NomeFantasia: nomeFantasia,
                Cnpj: cnpj
            }
        }
       
       
        fetch('AddPessoa', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dto)
        }).then(res => res.json())
            .then(res => {
                if (res == 0) {
                    toastr['success']("Pessoa Adicionada com sucesso!", "Sucesso");
                    DesabilitarCampos();
                    limparCampos();
                }
                else {
                 
                    toastr['error']("Não foi possível Adicionar a pessoa ", "Erro");
                }
            });
    }
    else {
        toastr['error'](erros, "Erro");
    }
   

}


document.getElementById("tipo").addEventListener("change", function () {
    var f = document.getElementsByClassName("idFisica");
    var j = document.getElementsByClassName("idJuridica");


    if (document.getElementById("tipo").value == "F") {
        f[0].style.display = "block";
        j[0].style.display = "none";
    }
    else
        if (document.getElementById("tipo").value == "J") {
            f[0].style.display = "none";
            j[0].style.display = "block";
        }
        else {
            f[0].style.display = "none";
            j[0].style.display = "none";
        }


});


$("#txtCpf").keydown(function () {
    try {
        $("#txtCpf").unmask();
    } catch (e) { }

    $("#txtCpf").mask("999.999.999-99");


    // ajustando foco
    var elem = this;
    setTimeout(function () {
        // mudo a posição do seletor
        elem.selectionStart = elem.selectionEnd = 10000;
    }, 0);
    // reaplico o valor para mudar o foco
    var currentValue = $(this).val();
    $(this).val('');
    $(this).val(currentValue);
});


$("#txtCnpj").keydown(function () {
    try {
        $("#txtCnpj").unmask();
    } catch (e) { }

    $("#txtCnpj").mask("99.999.999/9999-99");


    // ajustando foco
    var elem = this;
    setTimeout(function () {
        // mudo a posição do seletor
        elem.selectionStart = elem.selectionEnd = 10000;
    }, 0);
    // reaplico o valor para mudar o foco
    var currentValue = $(this).val();
    $(this).val('');
    $(this).val(currentValue);
});