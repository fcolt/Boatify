@RestResource(urlMapping='/BoatData/*')
global class BoatDataWebService {
    global static Set<String> getMethods = new Set<String>{
        'getBoats',
        'getSimilarBoats',
        'getBoatTypes',
        'getAllReviews',
        'getBoatsByLocation'
    };

    @HttpGet
    global static String doGet() {
        RestRequest req = RestContext.request;
        String getMethod = req.requestURI.substring(req.requestURI.lastIndexOf('/') + 1);
        String getMethodWithoutParams = getMethod.contains('?')
            ? getMethod.substring(0, getMethod.indexOf('?'))
            : getMethod;

        if (!getMethods.contains(getMethodWithoutParams)) {
            return getMethodWithoutParams;
        }

        switch on getMethodWithoutParams {
            when 'getBoats' {
                String boatTypeId = req.params.get('boatTypeId');
                Integer maxRecords = Integer.valueOf(req.params.get('maxRecords'));
                Integer offset = Integer.valueOf(req.params.get('offset'));

                return JSON.serialize(BoatDataServicePaginated.getBoats(boatTypeId, maxRecords, offset));
            }
            when 'getSimilarBoats' {
                String boatId = req.params.get('boatId');
                String similarBy = req.params.get('similarBy');
                Integer maxRecords = Integer.valueOf(req.params.get('maxRecords'));
                Integer offset = Integer.valueOf(req.params.get('offset'));

                return JSON.serialize(BoatDataServicePaginated.getSimilarBoats(boatId, similarBy, maxRecords, offset));
            }
            when 'getBoatTypes' {
                return JSON.serialize(BoatDataServicePaginated.getBoatTypes());
            }
            when 'getAllReviews' {
                String boatId = req.params.get('boatId');
                Integer maxRecords = Integer.valueOf(req.params.get('maxRecords'));
                Integer offset = Integer.valueOf(req.params.get('offset'));

                return JSON.serialize(BoatDataServicePaginated.getAllReviews(boatId, maxRecords, offset));
            }
            when 'getBoatsByLocation' {
                Decimal latitude = Decimal.valueOf(req.params.get('latitude'));
                Decimal longitude = Decimal.valueof(req.params.get('longitude'));
                String boatTypeId = req.params.get('boatTypeId');
                
                return BoatDataServicePaginated.getBoatsByLocation(latitude, longitude, boatTypeId);
            }
        }
        return 'Bad request';
    }
}
