package com.matheus.CRUDFuncionario.SistemaFuncionario.RestControllers;

import com.matheus.CRUDFuncionario.SistemaFuncionario.Models.Funcionario;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.matheus.CRUDFuncionario.SistemaFuncionario.dto.FuncionarioDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.matheus.CRUDFuncionario.SistemaFuncionario.Repository.FuncionarioRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Matheus Montanha
 * 
 *         Anotação @CrossOrigin indica a liberação da requisição do front-end
 *         Anotação @RestController indica que a classe é uma controller padrão
 *         do Spring Boot Anotação @RequestMappping indica a url de acesso.
 */
@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/Funcionarios")
public class FuncionarioRestController {

    @Autowired
    private FuncionarioRepository repositoryFuncionario;

    /**
     * Método que salva um funcionário.
     * 
     * @param funcionario a ser cadastrado
     * @return o funcionário salvo
     */
    @PostMapping
    public ResponseEntity<Funcionario> httpPostFuncionario(@RequestBody FuncionarioDTO funcionario) {
        Funcionario novoFuncionario = new Funcionario();
        novoFuncionario.setNome(funcionario.getNome());
        novoFuncionario.setSobrenome(funcionario.getSobrenome());
        novoFuncionario.setEmail(funcionario.getEmail());
        novoFuncionario.setNumeroPIS(funcionario.getNumeroPIS());
        Funcionario theCreatedFuncionario = repositoryFuncionario.save(novoFuncionario);
        return ResponseEntity.ok(theCreatedFuncionario);
    }

    /**
     * Método que recupera todos os funcionarios cadastrados.
     * 
     * @return lista de funcionarios
     */
    @GetMapping(value = "")
    public ResponseEntity<Object> httpGetFuncionarios() {
        if (repositoryFuncionario.count() > 0) {
            Iterable<Funcionario> funcionarios = repositoryFuncionario.findAll();
            return ResponseEntity.ok(funcionarios);
        } else {
            return ResponseEntity.badRequest().body("Nenhum funcionario foi cadastrado.");
        }
    }

    /**
     * Método que retorna um funcionário específico
     * 
     * @param id do funcionário desejado
     * @return funcionário com o @param id passado
     */
    @GetMapping("/{id}")
    public ResponseEntity<Object> httpGetUnicoFuncionario(@PathVariable long id) {
        Optional<Funcionario> funcioario = repositoryFuncionario.findById(id);
        if (funcioario.isPresent()) {
            return ResponseEntity.ok(funcioario);
        } else {
            return ResponseEntity.badRequest().body("Não foi encontrado nenhum funcionário com o ID = " + id);
        }
    }

    /**
     * Método que deleta um funcionário
     * 
     * @param id do funcionário que deseja deletar
     * @return retorna o funcionário deletado
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> httpDeleteFuncionario(@PathVariable long id) {
        Optional<Funcionario> funcionario = repositoryFuncionario.findById(id);
        if (funcionario.isPresent()) {
            repositoryFuncionario.deleteById(id);
            return ResponseEntity.ok(funcionario);
        } else {
            return ResponseEntity.badRequest().body("Não foi encontrado nenhum funcionário com o ID = " + id);
        }
    }

    /**
     * Método que atualiza um funcionário
     * @param id do funcionário que deseja atualizar
     * @param funcionario com os novos dados a serem atualizado.
     * @return o funcionário atualizado
     */
    @PutMapping("/{id}")
    public ResponseEntity<Funcionario> httpPutFuncionario(@PathVariable long id,
            @RequestBody FuncionarioDTO funcionario) {
        return repositoryFuncionario.findById(id).map(funcionarioAtualizado -> {
            funcionarioAtualizado.setNome(funcionario.getNome());
            funcionarioAtualizado.setSobrenome(funcionario.getSobrenome());
            funcionarioAtualizado.setEmail(funcionario.getEmail());
            funcionarioAtualizado.setNumeroPIS(funcionario.getNumeroPIS());
            Funcionario updated = repositoryFuncionario.save(funcionarioAtualizado);
            return ResponseEntity.ok().body(updated);
        }).orElse(ResponseEntity.notFound().build());
    }
}
