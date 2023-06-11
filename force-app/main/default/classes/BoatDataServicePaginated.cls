public with sharing class BoatDataServicePaginated {
    public static final String LENGTH_TYPE = 'Length';
    public static final String PRICE_TYPE = 'Price';
    public static final String TYPE_TYPE = 'Type';

    public static List<Boat__c> getBoats(String boatTypeId, Integer maxRecords, Integer offset) {
        String query =
            'SELECT ' +
                'Name, Description__c, Geolocation__Latitude__s, ' +
                'Geolocation__Longitude__s, Picture__c, Contact__r.Name, ' +
                'Contact__r.Email, BoatType__c, BoatType__r.Name, Length__c, Price__c ' +
            'FROM Boat__c ';
        if (String.isNotBlank(boatTypeId)) {
            query += 'WHERE BoatType__c = :boatTypeId ';
        }
        query += 
            'WITH SECURITY_ENFORCED ' +
            'LIMIT :maxRecords ' +
            'OFFSET :offset';
        return Database.query(String.escapeSingleQuotes(query));
    }

    public static List<Boat__c> getSimilarBoats(Id boatId, String similarBy, Integer maxRecords, Integer offset) {
        String similarBoatsQuery =         
            'SELECT ' +
                'Contact__r.Name, Name, BoatType__c, ' +
                'BoatType__r.Name, Length__c, Picture__c, ' +
                'Price__c, Year_Built__c ' +
            'FROM Boat__c ';
        Boat__c parentBoat = [
            SELECT Length__c, Price__c, BoatType__c, BoatType__r.Name
            FROM Boat__c
            WHERE Id = :boatId
            WITH SECURITY_ENFORCED
            LIMIT 1
        ];
        if (parentBoat == null) {
            return new List<Boat__c>();
        }

        Id parentBoatId = parentBoat.Id;
        Id parentBoatType = parentBoat.BoatType__c;

        if (similarBy == LENGTH_TYPE) {
            Double compareTermLower = parentBoat.Length__c / 1.2;
            Double compareTermUpper = parentBoat.Length__c * 1.2;
            similarBoatsQuery +=      
                'WHERE ' + 
                    'Id != :parentBoatId ' +
                    'AND Length__c >= :compareTermLower ' +
                    'AND Length__c <= :compareTermUpper ';
        } else if (similarBy == PRICE_TYPE) {
            Double compareTermLower = parentBoat.Price__c / 1.2;
            Double compareTermUpper = parentBoat.Price__c * 1.2;
            similarBoatsQuery += 
                'WHERE ' + 
                    'Id != :parentBoatId ' +
                    'AND Price__c >= :compareTermLower ' +
                    'AND Price__c <= :compareTermLower ';
        } else if (similarBy == TYPE_TYPE) {
            similarBoatsQuery += 
                'WHERE Id != :parentBoatId AND BoatType__c = :parentBoatType ';
        }
        similarBoatsQuery += 
            'WITH SECURITY_ENFORCED ' +
            'ORDER BY Length__c, Price__c, Year_Built__c ' +
            'LIMIT :maxRecords ' +
            'OFFSET :offset';

        return Database.query(String.escapeSingleQuotes(similarBoatsQuery));
    }

    public static List<BoatType__c> getBoatTypes() {
        return [SELECT Name, Id FROM BoatType__c WITH SECURITY_ENFORCED ORDER BY Name LIMIT 50];
    }

    public static List<BoatReview__c> getAllReviews(Id boatId, Integer maxRecords, Integer offset) {
        return [
            SELECT
                Id,
                Name,
                Comment__c,
                Rating__c,
                LastModifiedDate,
                CreatedDate,
                CreatedBy.Name,
                CreatedBy.SmallPhotoUrl,
                CreatedBy.CompanyName
            FROM BoatReview__c
            WHERE Boat__c = :boatId
            WITH SECURITY_ENFORCED
            ORDER BY CreatedDate DESC
            LIMIT :maxRecords
            OFFSET :offset
        ];
    }

    public static String getBoatsByLocation(Decimal latitude, Decimal longitude, String boatTypeId) {
        String query = 'SELECT Name, Geolocation__Latitude__s, Geolocation__Longitude__s FROM Boat__c ';
        if (String.isNotBlank(boatTypeId)) {
            query += 'WHERE BoatType__c = :boatTypeId ';
        }
        query += ' WITH SECURITY_ENFORCED ORDER BY DISTANCE(Geolocation__c, GEOLOCATION(:latitude, :longitude), \'mi\') LIMIT 10';
        return JSON.serialize(Database.query(query));
    }

    public static String updateBoatList(Object data) {
        List<Boat__c> boatsForUpdate = (List<Boat__c>) JSON.deserialize(JSON.serialize(data), List<Boat__c>.class);

        update boatsForUpdate;
        return 'Success: Boats updated successfully';
    }
}
