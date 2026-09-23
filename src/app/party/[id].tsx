import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import {
    Alert,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { COLORS, RADIUS, SPACING } from '../../constants/theme';
import { parties } from '../../data/parties';

export default function PartyDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const party = parties.find((item) => item.id === id);

    if (!party) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.notFound}>
                    <Ionicons
                        name="alert-circle-outline"
                        size={60}
                        color={COLORS.danger}
                    />

                    <Text style={styles.notFoundTitle}>
                        Party não encontrada
                    </Text>

                    <Pressable
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.backButtonText}>Voltar</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }

    const availableSlots =
        party.maxPlayers - party.currentPlayers;

    function handleJoinParty() {
        if (availableSlots <= 0) {
            Alert.alert(
                'Party cheia',
                'Essa party não possui mais vagas.'
            );

            return;
        }

        Alert.alert(
            'Você entrou na Party! 🎮',
            `Agora você faz parte de "${party?.title}".`
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.topBar}>
                    <Pressable
                        style={styles.iconButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color={COLORS.text}
                        />
                    </Pressable>

                    <Text style={styles.topTitle}>
                        Detalhes da Party
                    </Text>

                    <Pressable style={styles.iconButton}>
                        <Ionicons
                            name="share-social-outline"
                            size={22}
                            color={COLORS.text}
                        />
                    </Pressable>
                </View>

                <View style={styles.hero}>
                    <View style={styles.gameIcon}>
                        <Ionicons
                            name="game-controller"
                            size={42}
                            color={COLORS.primaryLight}
                        />
                    </View>

                    <Text style={styles.game}>
                        {party.game}
                    </Text>

                    <Text style={styles.partyTitle}>
                        {party.title}
                    </Text>

                    <View style={styles.status}>
                        <View style={styles.statusDot} />

                        <Text style={styles.statusText}>
                            Party aberta
                        </Text>
                    </View>
                </View>

                <View style={styles.infoGrid}>
                    <InfoItem
                        icon="people-outline"
                        label="Jogadores"
                        value={`${party.currentPlayers}/${party.maxPlayers}`}
                    />

                    <InfoItem
                        icon="trophy-outline"
                        label="Rank"
                        value={party.rank}
                    />

                    <InfoItem
                        icon="game-controller-outline"
                        label="Modo"
                        value={party.mode}
                    />

                    <InfoItem
                        icon="location-outline"
                        label="Região"
                        value={party.region}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Líder da Party
                    </Text>

                    <View style={styles.ownerCard}>
                        <View style={styles.avatar}>
                            <Ionicons
                                name="person"
                                size={25}
                                color={COLORS.primaryLight}
                            />
                        </View>

                        <View style={styles.ownerInfo}>
                            <Text style={styles.owner}>
                                @{party.owner.username}
                            </Text>

                            <Text style={styles.level}>
                                Nível {party.owner.level}
                            </Text>
                        </View>

                        <Ionicons
                            name="chevron-forward"
                            size={22}
                            color={COLORS.textSecondary}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Requisitos
                    </Text>

                    <View style={styles.requirements}>
                        <Requirement
                            icon="mic-outline"
                            text={
                                party.microphone
                                    ? 'Microfone obrigatório'
                                    : 'Microfone opcional'
                            }
                        />

                        <Requirement
                            icon="shield-checkmark-outline"
                            text={party.style}
                        />

                        <Requirement
                            icon="trophy-outline"
                            text={`Rank: ${party.rank}`}
                        />
                    </View>
                </View>

                <View style={styles.vacancy}>
                    <Ionicons
                        name="people"
                        size={22}
                        color={COLORS.primaryLight}
                    />

                    <View style={styles.vacancyInfo}>
                        <Text style={styles.vacancyTitle}>
                            {availableSlots}{' '}
                            {availableSlots === 1 ? 'vaga disponível' : 'vagas disponíveis'}
                        </Text>

                        <Text style={styles.vacancyText}>
                            Entre agora e jogue com essa galera.
                        </Text>
                    </View>
                </View>

                <Pressable
                    style={[
                        styles.joinButton,
                        availableSlots <= 0 && styles.disabledButton,
                    ]}
                    onPress={handleJoinParty}
                    disabled={availableSlots <= 0}
                >
                    <Ionicons
                        name="enter-outline"
                        size={21}
                        color="#FFFFFF"
                    />

                    <Text style={styles.joinButtonText}>
                        {availableSlots > 0
                            ? 'Entrar na Party'
                            : 'Party cheia'}
                    </Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

function InfoItem({
    icon,
    label,
    value,
}: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value: string;
}) {
    return (
        <View style={styles.infoItem}>
            <Ionicons
                name={icon}
                size={22}
                color={COLORS.primaryLight}
            />

            <Text style={styles.infoLabel}>
                {label}
            </Text>

            <Text style={styles.infoValue}>
                {value}
            </Text>
        </View>
    );
}

function Requirement({
    icon,
    text,
}: {
    icon: keyof typeof Ionicons.glyphMap;
    text: string;
}) {
    return (
        <View style={styles.requirement}>
            <Ionicons
                name={icon}
                size={19}
                color={COLORS.success}
            />

            <Text style={styles.requirementText}>
                {text}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    content: {
        padding: SPACING.lg,
        paddingBottom: 50,
    },

    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    topTitle: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: '700',
    },

    iconButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'center',
    },

    hero: {
        alignItems: 'center',
        paddingVertical: 35,
    },

    gameIcon: {
        width: 80,
        height: 80,
        borderRadius: 25,
        backgroundColor: COLORS.surface,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        marginBottom: SPACING.md,
    },

    game: {
        color: COLORS.primaryLight,
        fontSize: 14,
        fontWeight: '700',
    },

    partyTitle: {
        color: COLORS.text,
        fontSize: 25,
        fontWeight: '800',
        textAlign: 'center',
        marginTop: 5,
    },

    status: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: SPACING.md,
    },

    statusDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: COLORS.success,
    },

    statusText: {
        color: COLORS.success,
        fontSize: 12,
        fontWeight: '600',
    },

    infoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.sm,
    },

    infoItem: {
        width: '48%',
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: SPACING.md,
    },

    infoLabel: {
        color: COLORS.textSecondary,
        fontSize: 11,
        marginTop: 10,
    },

    infoValue: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: '700',
        marginTop: 3,
    },

    section: {
        marginTop: SPACING.xl,
    },

    sectionTitle: {
        color: COLORS.text,
        fontSize: 17,
        fontWeight: '700',
        marginBottom: SPACING.md,
    },

    ownerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: SPACING.md,
    },

    avatar: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: COLORS.surfaceLight,
        alignItems: 'center',
        justifyContent: 'center',
    },

    ownerInfo: {
        flex: 1,
        marginLeft: SPACING.md,
    },

    owner: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: '700',
    },

    level: {
        color: COLORS.textSecondary,
        fontSize: 12,
        marginTop: 3,
    },

    requirements: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: SPACING.md,
        gap: SPACING.md,
    },

    requirement: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
    },

    requirementText: {
        color: COLORS.textSecondary,
        fontSize: 13,
    },

    vacancy: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: RADIUS.md,
        padding: SPACING.md,
        marginTop: SPACING.xl,
        alignItems: 'center',
    },

    vacancyInfo: {
        marginLeft: SPACING.md,
        flex: 1,
    },

    vacancyTitle: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: '700',
    },

    vacancyText: {
        color: COLORS.textSecondary,
        fontSize: 12,
        marginTop: 3,
    },

    joinButton: {
        height: 54,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.sm,
        marginTop: SPACING.lg,
    },

    disabledButton: {
        opacity: 0.5,
    },

    joinButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },

    notFound: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING.lg,
    },

    notFoundTitle: {
        color: COLORS.text,
        fontSize: 20,
        fontWeight: '700',
        marginTop: SPACING.md,
    },

    backButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 25,
        paddingVertical: 12,
        borderRadius: RADIUS.md,
        marginTop: SPACING.lg,
    },

    backButtonText: {
        color: '#FFFFFF',
        fontWeight: '700',
    },
});