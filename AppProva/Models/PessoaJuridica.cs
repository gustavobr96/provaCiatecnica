using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppProva.Models
{
    public class PessoaJuridica : Pessoa
    {
        public string RazaoSocial { get;  private set; }
        public string NomeFantasia { get;  private set; }
        public string Cnpj { get;  private set; }

        public void PreparaDados(int? pessoaId, string razaoSocial, string nomeFantasia, string cnpj, char pessoaJuridicaFisica, string cep, string logradouro, int numero, string complemento, string bairro, string cidade, string uf)
        {

            setPessoaId(pessoaId);
            setRazaoSocial(razaoSocial);
            setNomeFantasia(nomeFantasia);
            setCnpj(cnpj);
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
        public void setRazaoSocial(string razaoSocial)
        {
            RazaoSocial = razaoSocial;
        }
        public void setNomeFantasia(string nomeFantasia)
        {
            NomeFantasia = nomeFantasia;
        }

        public void setCnpj(string cnpj)
        {
            Cnpj = cnpj;
        }


        #endregion


    }
}
