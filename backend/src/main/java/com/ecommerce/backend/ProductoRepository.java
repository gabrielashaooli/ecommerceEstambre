package com.ecommerce.backend;

import org.springframework.data.jpa.repository.JpaRepository;

// Esta interfaz le dice a Spring cómo acceder a la base de datos
public interface ProductoRepository extends JpaRepository<Producto, Long> {

}
