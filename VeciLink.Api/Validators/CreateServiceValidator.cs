using FluentValidation;
using VeciLink.Api.DTOs;

namespace VeciLink.Api.Validators;

public class CreateServiceValidator : AbstractValidator<CreateServiceDto>
{
    public CreateServiceValidator()
    {
        RuleFor(x => x.ServiceName)
            .NotEmpty().WithMessage("El nombre del servicio es requerido.");

        RuleFor(x => x.CategoryId)
            .GreaterThan(0).WithMessage("La categoría es requerida.");

        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("La descripción es requerida.");

        RuleFor(x => x.Neighborhood)
            .NotEmpty().WithMessage("El barrio es requerido.");

        RuleFor(x => x.Whatsapp)
            .NotEmpty().WithMessage("El WhatsApp es requerido.");
    }
}
