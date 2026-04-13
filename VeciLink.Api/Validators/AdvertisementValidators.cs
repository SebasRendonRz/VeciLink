using FluentValidation;
using VeciLink.Api.DTOs;

namespace VeciLink.Api.Validators;

public class CreateAdvertisementValidator : AbstractValidator<CreateAdvertisementDto>
{
    public CreateAdvertisementValidator()
    {
        RuleFor(x => x.ImageUrl)
            .NotEmpty().WithMessage("La imagen del anuncio es requerida.");

        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("El título del anuncio es requerido.");

        RuleFor(x => x.EndDate)
            .GreaterThan(x => x.StartDate).WithMessage("La fecha de fin debe ser posterior a la fecha de inicio.");
    }
}

public class UpdateAdvertisementValidator : AbstractValidator<UpdateAdvertisementDto>
{
    public UpdateAdvertisementValidator()
    {
        RuleFor(x => x.ImageUrl)
            .NotEmpty().WithMessage("La imagen del anuncio es requerida.");

        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("El título del anuncio es requerido.");

        RuleFor(x => x.EndDate)
            .GreaterThan(x => x.StartDate).WithMessage("La fecha de fin debe ser posterior a la fecha de inicio.");
    }
}
