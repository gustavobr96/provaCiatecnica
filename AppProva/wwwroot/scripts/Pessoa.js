document.addEventListener("DOMContentLoaded", function () {
    carregarDadosTabelaPessoa();
    DesabilitarCampos();
});


async function carregarDadosTabelaPessoa() {
    const response = await fetch('obtertodaspessoa');
    const data = await response.json();
    let tr = '';
    data.map(dado => {
        tr += `<tr>
               <td>${dado.pessoaId}</td>`;
        if (dado.pessoaJuridicaFisica == 'F') {
            tr += ` <td>${dado.cpf}</td>
                    <td>${dado.nome}</td>
                    <td>${dado.sobrenome}</td>
                    <td>${converterPadraoDataBr(dado.dataNascimento)}</td>
                  `;
        }
        else {
            tr += `<td>${dado.cnpj}</td>
                  <td>${dado.razaoSocial}</td>
                  <td>${dado.nomeFantasia}</td>
                  <td></td>`;
        }
        tr += `
               <td>${dado.cep}</td>
               <td>${dado.logradouro}</td>
               <td>${dado.numero}</td>
               <td>${dado.complemento}</td>
               <td>${dado.bairro}</td>
               <td>${dado.cidade}</td>
               <td>${dado.uf}</td>
               <td>
                  <button class="btn btn-icon btn-primary" id="btnAlterarPessoa${dado.pessoaId}" onclick="AlterarPessoa(${dado.pessoaId})"><i class="fa fa-edit"></i></button>
                  <button class="btn btn-icon btn-danger" id="btnRemoverPessoa${dado.pessoaId}" onclick="RemoverPessoa(${dado.pessoaId})"><i class="fa fa-trash"></i></button>
               </td>
               </tr>
              `; 
  

    });
    jQuery('#ListaPessoas > tbody').html(tr);
}

function RemoverPessoa(id) {

    jQuery('#modalConfirmarExclusaoPessoa').modal({
        backdrop: 'static',
        keyboard: false
    }).one('click', '#delete_pessoa', function (e) {

        fetch('ExcluirPessoa', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        }).then(res => res.json())
            .then(res => {
                if (res == 0) {

                    jQuery('#modalConfirmarExclusaoPessoa').modal('hide');
                    AtualizaTable();
                    toastr['success']("Pessoa excluída com sucesso!", "SUCESSO");

                }
                else {
                    jQuery('#modalConfirmarExclusaoPessoa').modal('hide');
                    toastr['error']("Não foi possível  a pessoa!", "ERRO");
                }
            });

    });

}



async function AlterarPessoa(codigo) {


    const response = await fetch('Obterporid/' + codigo);
    const data = await response.json();
    var f = document.getElementsByClassName("idFisica");
    var j = document.getElementsByClassName("idJuridica");
  
    $("#tipo").val(data.pessoaJuridicaFisica);

    if (document.getElementById("tipo").value == "F") {
        f[0].style.display = "block";
        j[0].style.display = "none";
        document.getElementById("txtNome").value = data.nome;
        document.getElementById("txtSobrenome").value = data.sobrenome;
        document.getElementById("txtCpf").value = data.cpf;
        document.getElementById("dtNascimento").value = converterPadraoDataEUA(data.dataNascimento);
    }
    else
        if (document.getElementById("tipo").value == "J") {
            f[0].style.display = "none";
            j[0].style.display = "block";
            document.getElementById("txtRazaoSocial").value = data.razaoSocial;
            document.getElementById("txtNomeFantasia").value = data.nomeFantasia;
            document.getElementById("txtCnpj").value = data.cnpj;
        }
        else {
            f[0].style.display = "none";
            j[0].style.display = "none";
        }

    document.getElementById("txtCep").value = data.cep;
    document.getElementById("txtCodigo").value = data.pessoaId;
    document.getElementById("txtLogradouro").value = data.logradouro;
    document.getElementById("txtNumero").value = data.numero;
    document.getElementById("txtComplemento").value = data.complemento;
    document.getElementById("txtBairro").value = data.bairro;
    document.getElementById("txtCidade").value = data.cidade;
    document.getElementById("txtUf").value = data.uf;
   


    jQuery('#modalAlterar').modal({
        backdrop: 'static',
        keyboard: false
    });

}


function AtualizaTable() {

    document.getElementById('destroy').innerHTML = "";
    document.getElementById('destroy').innerHTML = `
                    <table class="table table-striped" id="ListaPessoas">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Cpf/Cnpj</th>
                                <th scope="col">Nome/Razão Social</th>
                                <th scope="col">Sobrenome/Nome Fantasia</th>
                                <th scope="col">Data Nascimento</th>
                                <th scope="col">CEP</th>
                                <th scope="col">Logradouro</th>
                                <th scope="col">Número</th>
                                <th scope="col">Complemento</th>
                                <th scope="col">Bairro</th>
                                <th scope="col">Cidade</th>
                                <th scope="col">UF</th>
                                <th scope="col" style="min-width:80px!important">Opções</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                        <tfoot></tfoot>
                    </table>    `;

    carregarDadosTabelaPessoa();
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




document.getElementById("alterar_pessoa").addEventListener("click", function () {
    SalvarPessoa();
});



function SalvarPessoa() {

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
        if (tipo == "J") {
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

    let codigo = document.getElementById("txtCodigo").value;

    if (erros.length == 0) {

        let dto = {};
        if (tipo == "F") {
            dto = {
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
                DataNascimento: data,
                PessoaId: codigo
            }
        }
        else {
            dto = {
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
                Cnpj: cnpj,
                PessoaId: codigo
            }
        }


        fetch('AlterarPessoa', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dto)
        }).then(res => res.json())
            .then(res => {
                if (res == 0) {

                    jQuery('#modalAlterar').modal('hide');
                    AtualizaTable();
                    toastr['success']("Pessoa alterada!!", "Sucesso");
                    limparCampos();

                }
                else {

                    toastr['error']("Não foi possível alterar a pessoa", "Erro");
                }
            });
    }
    else {
        toastr['error'](erros, "Erro");
    }

}


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