using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppProva.Models
{
    public class Pessoa
    {
        public int PessoaId { get;   private set; }
        public char PessoaJuridicaFisica { get; private set; }
        public string CEP { get;  private set; }
        public string Logradouro { get;  private set; }
        public int Numero { get;  private set; }
        public string Complemento { get;  private set; }
        public string Bairro { get;  private set; }
        public string Cidade { get;  private set; }
        public string Uf { get; private set; }


        #region setters
        public void setPessoaId(int? pessoaId)
        {
            if (pessoaId != null)
                PessoaId = (int) pessoaId;
            else
                PessoaId = 0;
        }
        public void setPessoaJuridicaFisica(char pessoaJuridicaFisica)
        {
            PessoaJuridicaFisica = pessoaJuridicaFisica;
        }
        public void setCEP(string cep)
        {
            CEP = cep;
        }

        public void setLogradouro(string logradouro)
        {
            Logradouro = logradouro;
        }

        public void setNumero(int numero)
        {
            Numero = numero;
        }

        public void setComplemento(string complemento)
        {
            Complemento = complemento;
        }
        public void setBairro(string bairro)
        {
            Bairro = bairro;
        }
        public void setCidade(string cidade)
        {
            Cidade = cidade;
        }
        public void setUf(string uf)
        {
            Uf = uf;
        }

        #endregion

    }
}
