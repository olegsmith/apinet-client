angular.module('crm')
    .run(['i18n',
        function(i18n) {
             angular.extend(i18n, {
                'test':'testEN'
            });
        }
    ]);