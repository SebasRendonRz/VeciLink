using FluentValidation;
using VeciLink.Api.DTOs;

namespace VeciLink.Api.Validators;

public class RegisterCitizenValidator : AbstractValidator<RegisterCitizenRequestDto>
{
    public RegisterCitizenValidator()
    {
        RuleFor(x => x.FullName)
            .NotEmpty().WithMessage("El nombre es requerido.");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("El correo es requerido.")
            .EmailAddress().WithMessage("El correo no tiene un formato válido.");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("La contraseña es requerida.")
            .MinimumLength(8).WithMessage("La contraseña debe tener al menos 8 caracteres.");
    }
}
