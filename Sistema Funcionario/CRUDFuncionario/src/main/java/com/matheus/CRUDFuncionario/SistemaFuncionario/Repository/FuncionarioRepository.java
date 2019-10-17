package com.matheus.CRUDFuncionario.SistemaFuncionario.Repository;

import com.matheus.CRUDFuncionario.SistemaFuncionario.Models.Funcionario;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Matheus Montanha
 */
@Repository
public interface FuncionarioRepository extends CrudRepository<Funcionario, Long> {

}
