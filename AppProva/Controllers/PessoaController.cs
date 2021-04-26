using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppProva.Dto;
using AppProva.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AppProva.Controllers
{
    public class PessoaController : Controller
    {
        private readonly Contexto _contexto;

        public PessoaController(Contexto contexto)
        {
            _contexto = contexto;
        }
        [HttpGet]
        [Route("obtertodaspessoa")]
        public async Task<List<Pessoa>> ListarPessoas()
        {
            return await _contexto.Pessoas.ToListAsync();
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("CriarPessoa")]
        public IActionResult CriarPessoa()
        {
            return View("CriarPessoa");
        }

        [HttpPost]
        [Route("AddPessoa")]
        public async Task<IActionResult> AddPessoa([FromBody] PessoaDto p)
        {
            if(p != null)
            {
                if (p.PessoaJuridicaFisica == 'F')
                {
                    PessoaFisica f = new PessoaFisica();
                    f.PreparaDados(null, p.Nome, p.Sobrenome, p.Cpf, p.DataNascimento, p.PessoaJuridicaFisica, p.CEP, p.Logradouro, p.Numero, p.Complemento, p.Bairro, p.Cidade, p.Uf);
                    _contexto.Add(f);
                    await _contexto.SaveChangesAsync();
                    return Json("0");

                }
                else
                {
                    PessoaJuridica j = new PessoaJuridica();
                    j.PreparaDados(null, p.RazaoSocial, p.NomeFantasia, p.Cnpj, p.PessoaJuridicaFisica, p.CEP, p.Logradouro, p.Numero, p.Complemento, p.Bairro, p.Cidade, p.Uf);
                    _contexto.Add(j);
                    await _contexto.SaveChangesAsync();
                    return Json("0");
                }
            }
            return Json("-1");
        }

        [HttpPost]
        [Route("AlterarPessoa")]
        public async Task<IActionResult> AlterarPessoa([FromBody] PessoaDto p)
        {
            if(p != null)
            {
                if (p.PessoaJuridicaFisica == 'F')
                {
                    PessoaFisica f = new PessoaFisica();
                    f.PreparaDados(p.PessoaId, p.Nome, p.Sobrenome, p.Cpf, p.DataNascimento, p.PessoaJuridicaFisica, p.CEP, p.Logradouro, p.Numero, p.Complemento, p.Bairro, p.Cidade, p.Uf);
                    _contexto.Update(f);
                    await _contexto.SaveChangesAsync();
                    return Json("0");

                }
                else
                {
                    PessoaJuridica j = new PessoaJuridica();
                    j.PreparaDados(p.PessoaId, p.RazaoSocial, p.NomeFantasia, p.Cnpj, p.PessoaJuridicaFisica, p.CEP, p.Logradouro, p.Numero, p.Complemento, p.Bairro, p.Cidade, p.Uf);
                    _contexto.Update(j);
                    await _contexto.SaveChangesAsync();
                    return Json("0");
                }
            }
            return Json("-1");
        }



        
        [Route("Obterporid/{id}")]
        [HttpGet]
        public Pessoa Obterporid(int id)
        {
            Pessoa  pessoa = null;
            if (id > 0)
            {
                pessoa =  _contexto.Pessoas.Find(id);
                 return pessoa;
            }

            return  pessoa;
        }


        [HttpPost]
        [Route("ExcluirPessoa")]
        public async Task<IActionResult> ExcluirPessoa([FromBody] int id)
        {
            if (id > 0)
            {
                Pessoa pessoa = _contexto.Pessoas.Find(id);
                _contexto.Remove(pessoa);
                await _contexto.SaveChangesAsync();
                return Json("0");
            }
            else
                return Json("1");
        }

    }
}