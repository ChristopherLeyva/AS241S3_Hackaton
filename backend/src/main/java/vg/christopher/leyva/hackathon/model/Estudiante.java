package vg.christopher.leyva.hackathon.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "estudiante",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"dni", "email"})
    }
)
public class Estudiante {

    public static final String ESTADO_ACTIVO = "A";
    public static final String ESTADO_INACTIVO = "I";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // 1. Datos personales
    @Column(nullable = false)
    @NotBlank(message = "Nombre obligatorio")
    private String nombres;

    @Column(nullable = false)
    @NotBlank(message = "Apellido obligatorio")
    private String apellidos;

    @Column(nullable = false, unique = true, length = 8)
    @Pattern(regexp = "\\d{8}", message = "DNI debe tener 8 dígitos")
    private String dni;

    @Column(nullable = false)
    @Past(message = "Fecha de nacimiento debe ser pasada")
    private LocalDate fechaNacimiento;

    // 2. Datos académicos
    @Column(nullable = false)
    @NotBlank(message = "Programa obligatorio")
    private String programa;

    @Column(nullable = false)
    @Min(value = 2000)
    @Max(value = 2100)
    private Integer anioIngreso;

    // 3. Contacto
    @Column(nullable = false, unique = true)
    @Email(message = "Correo inválido")
    private String email;

    @Column(nullable = false, length = 9)
    @Pattern(regexp = "\\d{9}", message = "Celular debe tener 9 dígitos")
    private String celular;

    // Estado del estudiante (A: Activo, I: Inactivo)
    @Column(nullable = false)
    private String estado = ESTADO_ACTIVO;

    // 4. Registro de fecha (default)
    @Column(name = "fecha_registro", nullable = false)
    private LocalDate fechaRegistro = LocalDate.now();

    // 5. Relación con Ubicación
    @Embedded
    private Ubicacion ubicacion;
}
