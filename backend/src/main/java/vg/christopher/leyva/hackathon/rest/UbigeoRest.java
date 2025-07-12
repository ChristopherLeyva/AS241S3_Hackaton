@RestController
@RequestMapping("/api/ubigeo")
@RequiredArgsConstructor
public class UbigeoRest {

    @GetMapping("/departamentos")
    public List<String> getDepartamentos() {
        return List.of("Lima", "Cusco", "Arequipa", "Tacna");
    }

    @GetMapping("/provincias")
    public List<String> getProvincias(@RequestParam String departamento) {
        return switch (departamento) {
            case "Lima" -> List.of("Lima", "Huaral");
            case "Cusco" -> List.of("Cusco", "Urubamba");
            case "Arequipa" -> List.of("Arequipa", "Camana");
            case "Tacna" -> List.of("Tacna", "Tarata");
            default -> List.of();
        };
    }

    @GetMapping("/distritos")
    public List<String> getDistritos(@RequestParam String provincia) {
        return switch (provincia) {
            case "Lima" -> List.of("San Juan de Lurigancho", "Comas", "Miraflores");
            case "Cusco" -> List.of("Wanchaq", "Santiago");
            case "Arequipa" -> List.of("Cercado", "Yanahuara");
            case "Tacna" -> List.of("Tacna", "Alto de la Alianza");
            default -> List.of();
        };
    }
}
