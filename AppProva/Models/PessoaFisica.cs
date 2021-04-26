using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppProva.Models
{
    public class PessoaFisica : Pessoa
    {
       
        public string Nome { get;  private set; }
        public string Sobrenome { get;  private set; }
        public string Cpf { get;  private set; }
        public DateTime DataNascimento { get;  private set; }


        public void PreparaDados(int? pessoaId, string nome, string sobrenome, string cpf, DateTime dataNascimento, char pessoaJuridicaFisica, string cep, string logradouro, int numero, string complemento, string bairro, string cidade, string uf)
        {
           
            setPessoaId(pessoaId);
            setNome(nome);
            setSobrenome(sobrenome);
            setCpf(cpf);
            setDataNascimento(dataNascimento);
            setPessoaJuridicaFisica(pessoaJuridicaFisica);
            setCEP(cep);
            setLogradouro(logradouro);
            setNumero(numero);
            setComplemento(complemento);
            setBairro(bairro);
            setCidade(cidade);
            setUf(uf);
        }

        #region setters
        public void setNome(string nome)
        {
            Nome = nome;
        }
        public void setSobrenome(string sobrenome)
        {
            Sobrenome = sobrenome;
        }
        public void setCpf(string cpf)
        {
            Cpf = cpf;
        }
        public void setDataNascimento(DateTime dataNascimento)
        {
            DataNascimento = dataNascimento;
        }


        #endregion

    }
}
