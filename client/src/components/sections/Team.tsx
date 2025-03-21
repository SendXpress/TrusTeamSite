import { useTranslation } from 'react-i18next';
import { constants } from '@/utils/constants';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TeamMember {
  id: string;
  name: string;
  linkedin: string;
  email: string;
  photo: string;
}

export function Team() {
  const { t } = useTranslation();

  return (
    <div id="team" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 font-['Inter']">
            {t('team.title')}
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            {t('team.description')}
          </p>
        </div>
        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {constants.teamMembers.map((member, index) => (
            <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={member.photo} alt={member.name} />
                    <AvatarFallback className="bg-primary-100 text-primary-700 text-lg">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">{t(`team.members.${member.id}.name`)}</h3>
                  <p className="text-sm text-primary-500">{t(`team.members.${member.id}.position`)}</p>
                  <div className="mt-3 text-sm text-gray-500 text-center">
                    <p>{t(`team.members.${member.id}.certifications`)}</p>
                    <p>{t(`team.members.${member.id}.experience`)}</p>
                  </div>
                  <div className="mt-5 flex space-x-3">
                    <a 
                      href={`https://${member.linkedin}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <i className="fab fa-linkedin text-lg"></i>
                    </a>
                    <a 
                      href={`mailto:${member.email}`} 
                      title={member.email}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <i className="fas fa-envelope text-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
