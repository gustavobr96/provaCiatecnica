/**
 * Script responsável por métodos padrões e validações
*/



function Alerta(divId, msg) {
    $("#" + divId).html(msg);
    $("#" + divId).show(300);
    $("#" + divId).delay(3000);
    $("#" + divId).hide(300);
};


// Calculo idade

function calculaIdade(dataNasc) {
    var dataAtual = new Date();
    var anoAtual = dataAtual.getFullYear();
    var anoNascParts = dataNasc.split('-');
    var diaNasc = anoNascParts[2];
    var mesNasc = anoNascParts[1];
    var anoNasc = anoNascParts[0];
    var idade = anoAtual - anoNasc;
    var mesAtual = dataAtual.getMonth() + 1;
    //Se mes atual for menor que o nascimento, nao fez aniversario ainda;  
    if (mesAtual < mesNasc) {
        idade--;
    } else {
        //Se estiver no mes do nascimento, verificar o dia
        if (mesAtual == mesNasc) {
            if (new Date().getDate() < diaNasc) {
                //Se a data atual for menor que o dia de nascimento ele ainda nao fez aniversario
                idade--;
            }
        }
    }
    return idade;
}



// foi criado este método para conseguir atualizar o datatable
// primeiro destroi o datatable e depois cria outro novo.
function destruirDataTable(nomeTabela) {

    if ($.fn.dataTable.isDataTable(`#${nomeTabela}`)) {
        $(`#${nomeTabela}`).DataTable().destroy();
    }
}

function converterPadraoDataBr(dt) {
    if (dt != null && dt != "") {
        dt = dt.split('-');
        let dt2 = dt[2].split('T')
        let data = dt2[0] + '/' + dt[1] + '/' + dt[0];
        return data;
    }
    return "";
}

function converterPadraoDataEUA(dt) {
    if (dt != null && dt != "") {
        dt = dt.split('-');
        let dt2 = dt[2].split('T')
        let data = dt[0] + '-' + dt[1] + '-' + dt2[0];
        return data;
    }
    return "";
}

function abrirLoader() {
    $('#divLoader').modal('show');
}

function fecharLoader() {
    setTimeout(function () {
        $('#divLoader').modal('hide');
    }, 500);
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}





function DesabilitarCampos() {
    var f = document.getElementsByClassName("idFisica");
    var j = document.getElementsByClassName("idJuridica");
    f[0].style.display = "none";
    j[0].style.display = "none";
}



function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('txtLogradouro').value = ("");
    document.getElementById('txtBairro').value = ("");
    document.getElementById('txtCidade').value = ("");
    document.getElementById('txtUf').value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.

        document.getElementById('txtLogradouro').value = (conteudo.logradouro);
        document.getElementById('txtBairro').value = (conteudo.bairro);
        document.getElementById('txtCidade').value = (conteudo.localidade);
        document.getElementById('txtUf').value = (conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}


function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('txtLogradouro').value = "...";
            document.getElementById('txtBairro').value = "...";
            document.getElementById('txtCidade').value = "...";
            document.getElementById('txtUf').value = "...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};




function limparCampos() {
    $("#tipo").val(0);
    document.getElementById("txtNome").value = "";
    document.getElementById("txtSobrenome").value = "";
    document.getElementById("txtCpf").value = "";
    document.getElementById("txtRazaoSocial").value = "";
    document.getElementById("txtNomeFantasia").value = "";
    document.getElementById("txtCnpj").value = "";
      

    document.getElementById("txtCep").value = "";
    document.getElementById("txtCodigo").value = "0";
    document.getElementById("txtLogradouro").value = "";
    document.getElementById("txtNumero").value = "";
    document.getElementById("txtComplemento").value = "";
    document.getElementById("txtBairro").value = "";
    document.getElementById("txtCidade").value = "";
    document.getElementById("txtUf").value = "";
   
};

