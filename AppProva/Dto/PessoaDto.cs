using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppProva.Dto
{
    public class PessoaDto
    {
        public int PessoaId { get; set; }
        public char PessoaJuridicaFisica { get;  set; }
        public string CEP { get;  set; }
        public string Logradouro { get;  set; }
        public int Numero { get;  set; }
        public string Complemento { get;  set; }
        public string Bairro { get;  set; }
        public string Cidade { get;  set; }
        public string Uf { get;  set; }
        public string Nome { get;  set; }
        public string Sobrenome { get;  set; }
        public string Cpf { get;  set; }
        public DateTime DataNascimento { get;  set; }
        public string RazaoSocial { get;  set; }
        public string NomeFantasia { get;  set; }
        public string Cnpj { get;  set; }


    }
}
