using FluentValidation;
using VeciLink.Api.DTOs;

namespace VeciLink.Api.Validators;

public class CreateRatingValidator : AbstractValidator<CreateRatingDto>
{
    public CreateRatingValidator()
    {
        RuleFor(x => x.ServiceId)
            .GreaterThan(0).WithMessage("El servicio es requerido.");

        RuleFor(x => x.Stars)
            .InclusiveBetween(1, 5).WithMessage("Las estrellas deben estar entre 1 y 5.");
    }
}

public class CreateReportValidator : AbstractValidator<CreateReportDto>
{
    public CreateReportValidator()
    {
        RuleFor(x => x.Reason)
            .NotEmpty().WithMessage("El motivo del reporte es requerido.");

        RuleFor(x => x)
            .Must(x => x.ReportedUserId.HasValue || x.ReportedServiceId.HasValue)
            .WithMessage("Debe indicar un usuario o servicio reportado.");
    }
}
