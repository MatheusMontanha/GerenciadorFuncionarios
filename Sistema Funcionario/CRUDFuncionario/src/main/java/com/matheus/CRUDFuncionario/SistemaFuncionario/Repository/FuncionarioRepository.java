package com.matheus.CRUDFuncionario.SistemaFuncionario.Repository;

import com.matheus.CRUDFuncionario.SistemaFuncionario.Models.Funcionario;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Matheus Montanha
 * 
 * Interface que extend os métodos presentes no CRUD.
 * 
 * Anotação @Repository indica o uso do padrão de projeto Repository padrão do Spring Boot.
 */

@Repository
public interface FuncionarioRepository extends CrudRepository<Funcionario, Long> {

}
