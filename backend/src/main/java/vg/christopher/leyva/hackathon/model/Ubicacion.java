package vg.christopher.leyva.hackathon.model;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Embeddable
@Data
public class Ubicacion {

    @NotBlank(message = "Departamento obligatorio")
    private String departamento;

    @NotBlank(message = "Provincia obligatoria")
    private String provincia;

    @NotBlank(message = "Distrito obligatorio")
    private String distrito;
}
