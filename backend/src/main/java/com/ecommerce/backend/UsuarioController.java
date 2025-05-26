package com.ecommerce.backend;

import com.ecommerce.backend.seguridad.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

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

        nuevoUsuario.setContrasena(passwordEncoder.encode(nuevoUsuario.getContrasena()));
        nuevoUsuario.setEstadoCuenta("Activada");
        usuarioRepository.save(nuevoUsuario);

        return ResponseEntity.ok("Registro exitoso.");
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> loginJwt(@RequestBody Usuario usuario) {
        Optional<Usuario> existente = usuarioRepository.findByCorreo(usuario.getCorreo());

        if (existente.isPresent()) {
            Usuario u = existente.get();
            // Comparar contraseña encriptada con la ingresada
            if (passwordEncoder.matches(usuario.getContrasena(), u.getContrasena())) {
                String token = jwtUtil.generarToken(u.getCorreo());

                Map<String, Object> response = new HashMap<>();
                response.put("mensaje", "Login exitoso");
                response.put("token", token);
                response.put("usuario", u);

                return ResponseEntity.ok(response);
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Correo o contraseña incorrectos");
    }
}
