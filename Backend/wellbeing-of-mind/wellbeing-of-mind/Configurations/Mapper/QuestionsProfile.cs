using AutoMapper;
using wellbeing_of_mind.Domain;
using wellbeing_of_mind.DTOs;

namespace wellbeing_of_mind.Configurations.Mapper
{
    public class QuestionsProfile : Profile
    {
        public QuestionsProfile() {
            CreateMap<Question, QuestionDto>();
            CreateMap<Question, QuestionAnswersDto>();
            CreateMap<Choice, ChoiceDto>();
            CreateMap<Test, TestDto>();
            CreateMap<Test, TestQuestionsDto>();
        }
    }
}
