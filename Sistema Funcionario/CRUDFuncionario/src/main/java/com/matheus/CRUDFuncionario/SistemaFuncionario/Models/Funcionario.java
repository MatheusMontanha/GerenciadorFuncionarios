/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.matheus.CRUDFuncionario.SistemaFuncionario.Models;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

/**
 *
 * @author Matheus Montanha
 */

 /**
  * Anotação @Data da biblioteca Lombok que deixa implicito os getters e setters
  * Anotação @Entity que indica que esta classe será uma entidade no banco de dados
  */
@Data
@Entity
public class Funcionario implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idFuncionario;
    private String nome;
    private String sobrenome;
    private String email;
    private long numeroPIS;
}
