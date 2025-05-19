package com.ecommerce.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Asegura conexión con React
public class UsuarioController {

   @Autowired
    private UsuarioRepository usuarioRepository; 

    // REGISTRO
    @PostMapping("/usuarios")
    public String registrarUsuario(@RequestBody Usuario nuevoUsuario) {
        Optional<Usuario> existente = usuarioRepository.findByCorreo(nuevoUsuario.getCorreo());

        if (existente.isPresent()) {
            return "El correo ya está registrado.";
        }

        nuevoUsuario.setEstadoCuenta("Activada");
        usuarioRepository.save(nuevoUsuario);
        return "Registro exitoso.";
    }

    // LOGIN
    @PostMapping("/login")
    public String login(@RequestBody Usuario usuario) {
        Optional<Usuario> existente = usuarioRepository.findByCorreo(usuario.getCorreo());

        if (existente.isPresent() && existente.get().getContrasena().equals(usuario.getContrasena())) {
            return "Login exitoso";
        } else {
            return "Correo o contraseña incorrectos";
        }
    }
}
