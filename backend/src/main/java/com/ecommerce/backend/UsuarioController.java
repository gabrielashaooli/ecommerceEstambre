package com.ecommerce.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // REGISTRO
    @PostMapping("/usuarios")
    public ResponseEntity<String> registrarUsuario(@RequestBody Usuario nuevoUsuario) {
        if (nuevoUsuario.getCorreo() == null || nuevoUsuario.getContrasena() == null || nuevoUsuario.getNombre() == null) {
            return ResponseEntity.badRequest().body("Todos los campos son obligatorios.");
        }

        Optional<Usuario> existente = usuarioRepository.findByCorreo(nuevoUsuario.getCorreo());
        if (existente.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El correo ya está registrado.");
        }

        nuevoUsuario.setEstadoCuenta("Activada");
        usuarioRepository.save(nuevoUsuario);
        return ResponseEntity.ok("Registro exitoso.");
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> loginJwt(@RequestBody Usuario usuario) {
        Optional<Usuario> existente = usuarioRepository.findByCorreo(usuario.getCorreo());

        if (existente.isPresent() && existente.get().getContrasena().equals(usuario.getContrasena())) {
            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", "Login exitoso");
            response.put("usuario", existente.get());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Correo o contraseña incorrectos");
        }
    }
}